import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';

import { registerAuthHandlers } from '@/src/api/client';
import { registerGuest } from '@/src/api/endpoints';

const TOKEN_KEY = 'nomenclator.jwt';
const DEVICE_ID_KEY = 'nomenclator.deviceId';

/**
 * expo-secure-store has no web implementation; use localStorage on web for
 * real persistence across sessions. Native devices get keychain/keystore.
 */
function isWeb(): boolean {
  return Platform.OS === 'web';
}

async function getSecure(key: string): Promise<string | null> {
  if (isWeb()) {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

async function setSecure(key: string, value: string): Promise<void> {
  if (isWeb()) {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

/** Device UUID persisted across restarts; regenerates on reinstall (REQ-GA-2). */
async function getOrCreateDeviceId(): Promise<string> {
  const stored = await getSecure(DEVICE_ID_KEY);
  if (stored) {
    return stored;
  }
  const fresh = Crypto.randomUUID();
  await setSecure(DEVICE_ID_KEY, fresh);
  return fresh;
}

/** Find-or-create a guest session and persist the JWT before any protected call. */
async function registerGuestSession(): Promise<string> {
  const deviceId = await getOrCreateDeviceId();
  const { access_token } = await registerGuest(deviceId);
  await setSecure(TOKEN_KEY, access_token);
  return access_token;
}

interface AuthContextValue {
  /** Current JWT, or null until the guest session exists. */
  token: string | null;
  /** True once the bootstrap (rehydrate or guest registration) settled. */
  isReady: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Boots guest auth on first launch: rehydrates the stored JWT or registers a
 * new guest keyed by a device UUID. A failed bootstrap (offline) leaves the app
 * usable: `isReady` still flips and the collection simply hydrates later.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await getSecure(TOKEN_KEY);
        if (stored) {
          if (!cancelled) setToken(stored);
        } else {
          const fresh = await registerGuestSession();
          if (!cancelled) setToken(fresh);
        }
      } catch (error) {
        console.warn('[auth] guest bootstrap failed; will retry on next protected call', error);
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Issues a fresh guest JWT (idempotent find-or-create server-side). */
  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      const fresh = await registerGuestSession();
      setToken(fresh);
      return fresh;
    } catch (error) {
      console.warn('[auth] token renewal failed', error);
      return null;
    }
  }, []);

  useEffect(() => {
    registerAuthHandlers({
      getToken: () => getSecure(TOKEN_KEY),
      refreshToken,
    });
  }, [refreshToken]);

  const value = useMemo(() => ({ token, isReady }), [token, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

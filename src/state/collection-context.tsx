import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getLikes,
  getSaved,
  likePostal,
  saveItem,
  unlikePostal,
  unsaveItem,
} from '@/src/api/endpoints';
import { useAuth } from './auth-context';

/**
 * Shared likes/saved state (design D10), mirroring the cart-context pattern:
 * the provider owns three id sets, hydrates them from `/me/likes` and
 * `/me/saved` once the guest token is ready, and every toggle is optimistic
 * with rollback when the mutation fails.
 */

interface CollectionContextValue {
  likedPostalIds: Set<string>;
  savedStreetIds: Set<string>;
  savedPostalIds: Set<string>;
  /** True once the initial hydration attempt settled (success or failure). */
  isHydrated: boolean;
  toggleLikePostal: (id: string) => Promise<void>;
  toggleSaveStreet: (id: string) => Promise<void>;
  toggleSavePostal: (id: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

function withId(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  next.add(id);
  return next;
}

function withoutId(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  next.delete(id);
  return next;
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  const { token, isReady } = useAuth();
  const [likedPostalIds, setLikedPostalIds] = useState<Set<string>>(new Set());
  const [savedStreetIds, setSavedStreetIds] = useState<Set<string>>(new Set());
  const [savedPostalIds, setSavedPostalIds] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);
  const hydratedRef = useRef(false);

  // Hydrate once the guest token exists; a failed attempt (offline) keeps the
  // sets empty and the app fully usable (REQ-GA-3: no data loss, non-blocking).
  useEffect(() => {
    if (!isReady || !token || hydratedRef.current) {
      return;
    }
    hydratedRef.current = true;
    void Promise.all([getLikes(), getSaved()])
      .then(([likes, saved]) => {
        setLikedPostalIds(new Set(likes));
        const streets = new Set<string>();
        const postals = new Set<string>();
        for (const item of saved) {
          if (item.type === 'street') {
            streets.add(item.id);
          } else {
            postals.add(item.id);
          }
        }
        setSavedStreetIds(streets);
        setSavedPostalIds(postals);
      })
      .catch((error) => {
        console.warn('[collection] hydration failed; sets stay empty', error);
      })
      .finally(() => setIsHydrated(true));
  }, [isReady, token]);

  const toggleLikePostal = useCallback(
    async (id: string) => {
      const wasLiked = likedPostalIds.has(id);
      // Skip if already toggling (prevent double-call)
      setLikedPostalIds((prev) => (wasLiked ? withoutId(prev, id) : withId(prev, id)));
      try {
        if (wasLiked) {
          await unlikePostal(id);
        } else {
          await likePostal(id);
        }
      } catch (error) {
        // Rollback on failure
        setLikedPostalIds((prev) => (wasLiked ? withId(prev, id) : withoutId(prev, id)));
        console.error('[collection] like toggle failed:', error);
      }
    },
    [likedPostalIds],
  );

  const toggleSaveStreet = useCallback(
    async (id: string) => {
      const wasSaved = savedStreetIds.has(id);
      setSavedStreetIds((prev) => (wasSaved ? withoutId(prev, id) : withId(prev, id)));
      try {
        if (wasSaved) {
          await unsaveItem('street', id);
        } else {
          await saveItem('street', id);
        }
      } catch (error) {
        setSavedStreetIds((prev) => (wasSaved ? withId(prev, id) : withoutId(prev, id)));
        console.error('[collection] street save toggle failed:', error);
      }
    },
    [savedStreetIds],
  );

  const toggleSavePostal = useCallback(
    async (id: string) => {
      const wasSaved = savedPostalIds.has(id);
      setSavedPostalIds((prev) => (wasSaved ? withoutId(prev, id) : withId(prev, id)));
      try {
        if (wasSaved) {
          await unsaveItem('postal', id);
        } else {
          await saveItem('postal', id);
        }
      } catch (error) {
        setSavedPostalIds((prev) => (wasSaved ? withId(prev, id) : withoutId(prev, id)));
        console.error('[collection] postal save toggle failed:', error);
      }
    },
    [savedPostalIds],
  );

  const value = useMemo(
    () => ({
      likedPostalIds,
      savedStreetIds,
      savedPostalIds,
      isHydrated,
      toggleLikePostal,
      toggleSaveStreet,
      toggleSavePostal,
    }),
    [
      likedPostalIds,
      savedStreetIds,
      savedPostalIds,
      isHydrated,
      toggleLikePostal,
      toggleSaveStreet,
      toggleSavePostal,
    ],
  );

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionContextValue {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
}
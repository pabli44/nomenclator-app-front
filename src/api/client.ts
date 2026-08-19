import Constants from 'expo-constants';

/**
 * Typed API client for the nomenclator backend.
 *
 * - Base URL resolution: `EXPO_PUBLIC_API_URL` env var wins; on a physical
 *   device during development it falls back to the Metro host LAN address
 *   (the same machine that serves the API) on port 3000.
 * - Every response is unwrapped from the backend envelope `{statusCode, data}`
 *   (design D12 keeps the Nest error JSON; failures are surfaced as ApiError).
 * - Protected calls that get a 401 are retried once after re-issuing a guest
 *   token (REQ-GA-3). The auth flow is injected via `registerAuthHandlers` to
 *   avoid a circular import with `auth-context`.
 */

export interface Envelope<T> {
  statusCode: number;
  data: T;
}

export interface ApiErrorBody {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Attach the stored JWT and apply the 401 -> refresh -> retry-once policy. */
  auth?: boolean;
}

interface AuthHandlers {
  getToken: () => Promise<string | null>;
  refreshToken: () => Promise<string | null>;
}

let authHandlers: AuthHandlers | null = null;

/** Registered once by AuthProvider; decouples the client from the auth state. */
export function registerAuthHandlers(handlers: AuthHandlers): void {
  authHandlers = handlers;
}

/** Pure resolution rule, unit-testable without the native `Constants` module. */
export function resolveBaseUrl(
  envUrl?: string,
  hostUri?: string | null,
): string {
  const trimmed = envUrl?.trim();
  if (trimmed) {
    return trimmed.replace(/\/+$/, '');
  }
  const host = hostUri?.split(':')[0];
  if (host) {
    return `http://${host}:3000`;
  }
  return 'http://localhost:3000';
}

export function getBaseUrl(): string {
  return resolveBaseUrl(
    process.env.EXPO_PUBLIC_API_URL,
    Constants.expoConfig?.hostUri,
  );
}

function buildHeaders(options: RequestOptions, token: string | null): Record<string, string> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (options.auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function toApiError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    // Non-JSON error body (proxy, gateway, ...); fall back to the status text.
  }
  const rawMessage = body?.message ?? (response.statusText || `Request failed (${response.status})`);
  const message = Array.isArray(rawMessage) ? rawMessage.join('. ') : rawMessage;
  return new ApiError(response.status, message, body);
}

async function unwrap<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as Envelope<T>;
  return payload.data;
}

async function doFetch<T>(
  path: string,
  options: RequestOptions,
  token: string | null,
): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    method: options.method ?? 'GET',
    headers: buildHeaders(options, token),
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) {
    throw await toApiError(response);
  }
  return unwrap<T>(response);
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { auth = false } = options;
  const token = auth ? (await authHandlers?.getToken()) ?? null : null;

  try {
    return await doFetch<T>(path, options, token);
  } catch (error) {
    const isAuthFailure = error instanceof ApiError && error.status === 401 && auth;
    if (!isAuthFailure) {
      throw error;
    }
    // Expired or invalid token: issue a fresh guest session and retry once.
    const refreshed = await authHandlers?.refreshToken();
    if (refreshed) {
      return doFetch<T>(path, options, refreshed);
    }
    throw error;
  }
}

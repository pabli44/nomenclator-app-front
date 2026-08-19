import { request } from './client';

/**
 * Typed backend endpoints (contract: backend-likes-postales design D7/D8/D10).
 * All paths live under the global `/api` prefix served by the backend;
 * successful responses arrive wrapped in `{statusCode, data}` (unwrapped here).
 */

export interface GuestUser {
  id: string;
  email: string;
}

export interface GuestSession {
  access_token: string;
  user: GuestUser;
}

export interface Postal {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
}

export type SavedItemType = 'street' | 'postal';

export interface SavedItem {
  type: SavedItemType;
  id: string;
}

/** Find-or-create a guest user keyed by a device UUID (REQ-GA-1). */
export const registerGuest = (deviceId: string): Promise<GuestSession> =>
  request<GuestSession>('/auth/guest', { method: 'POST', body: { deviceId } });

/** Public catalog endpoints — bonus only, the front renders static data (D11). */
export const getPostals = (): Promise<Postal[]> => request<Postal[]>('/postals');

export const getPostal = (id: string): Promise<Postal> =>
  request<Postal>(`/postals/${id}`);

/** Idempotent like/unlike of a postal (REQ-LK-1 / REQ-LK-2). */
export const likePostal = (id: string): Promise<{ liked: true }> =>
  request<{ liked: true }>(`/postals/${id}/like`, { method: 'PUT', auth: true });

export const unlikePostal = (id: string): Promise<{ liked: false }> =>
  request<{ liked: false }>(`/postals/${id}/like`, { method: 'DELETE', auth: true });

/** Idempotent save/unsave of an item by type (REQ-SV-1 / REQ-SV-2). */
export const saveItem = (
  type: SavedItemType,
  id: string,
): Promise<{ saved: true }> =>
  request<{ saved: true }>(`/items/${type}/${id}/save`, {
    method: 'PUT',
    auth: true,
  });

export const unsaveItem = (
  type: SavedItemType,
  id: string,
): Promise<{ saved: false }> =>
  request<{ saved: false }>(`/items/${type}/${id}/save`, {
    method: 'DELETE',
    auth: true,
  });

/** Hydration endpoints (REQ-LK-3 / REQ-SV-3). */
export const getLikes = (): Promise<string[]> =>
  request<string[]>('/me/likes', { auth: true });

export const getSaved = (): Promise<SavedItem[]> =>
  request<SavedItem[]>('/me/saved', { auth: true });

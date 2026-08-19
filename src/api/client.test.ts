import {
  ApiError,
  registerAuthHandlers,
  request,
  resolveBaseUrl,
} from './client';

/**
 * Unit tests for the pure API-client logic: base-URL resolution, envelope
 * unwrapping, ApiError mapping and the 401 -> refresh -> retry-once policy
 * (REQ-GA-3). fetch is mocked; no native modules are exercised.
 */

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 404 ? 'Not Found' : 'Error',
    json: async () => body,
  };
}

type FetchMock = ReturnType<typeof jest.fn>;

/** Resolves with the thrown error (or undefined when the promise succeeds). */
async function captureError(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
    return undefined;
  } catch (error) {
    return error;
  }
}

describe('resolveBaseUrl', () => {
  it('prefers EXPO_PUBLIC_API_URL and strips trailing slashes', () => {
    expect(resolveBaseUrl('https://api.example.com/', '192.168.1.5:8081')).toBe(
      'https://api.example.com',
    );
  });

  it('falls back to the Metro host LAN address on port 3000', () => {
    expect(resolveBaseUrl(undefined, '192.168.1.5:8081')).toBe(
      'http://192.168.1.5:3000',
    );
  });

  it('falls back to localhost when no env var or host is available', () => {
    expect(resolveBaseUrl(undefined, null)).toBe('http://localhost:3000');
    expect(resolveBaseUrl(undefined, undefined)).toBe('http://localhost:3000');
  });

  it('ignores a blank env var', () => {
    expect(resolveBaseUrl('   ', '10.0.0.2:8081')).toBe('http://10.0.0.2:3000');
  });
});

describe('request', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    registerAuthHandlers({
      getToken: async () => null,
      refreshToken: async () => null,
    });
  });

  it('unwraps the {statusCode, data} envelope', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(200, { statusCode: 200, data: ['p3', 'p5'] }),
    ) as unknown as typeof fetch;

    await expect(
      request<string[]>('/me/likes', { auth: true }),
    ).resolves.toEqual(['p3', 'p5']);
  });

  it('throws ApiError with the server message on non-2xx', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(404, { statusCode: 404, message: 'Postal p99 not found' }),
    ) as unknown as typeof fetch;

    const error = await captureError(request('/postals/p99'));
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 404, message: 'Postal p99 not found' });
  });

  it('joins an array message into a single string', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(400, { statusCode: 400, message: ['deviceId must be a UUID', 'other'] }),
    ) as unknown as typeof fetch;

    const error = await captureError(request('/auth/guest', { method: 'POST', body: {} }));
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).message).toBe('deviceId must be a UUID. other');
  });

  it('retries once with a refreshed token after 401 (REQ-GA-3)', async () => {
    const getToken = jest.fn().mockResolvedValue('expired-token');
    const refreshToken = jest.fn().mockResolvedValue('fresh-token');
    registerAuthHandlers({ getToken, refreshToken });

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(jsonResponse(401, { statusCode: 401, message: 'Unauthorized' }))
      .mockResolvedValueOnce(
        jsonResponse(200, { statusCode: 200, data: { liked: true } }),
      );
    global.fetch = fetchMock as unknown as typeof fetch;

    await expect(
      request('/postals/p3/like', { method: 'PUT', auth: true }),
    ).resolves.toEqual({ liked: true });
    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const retryCall = fetchMock.mock.calls[1];
    expect(retryCall[1].headers.Authorization).toBe('Bearer fresh-token');
  });

  it('does not retry when token renewal fails', async () => {
    registerAuthHandlers({
      getToken: async () => 'expired-token',
      refreshToken: async () => null,
    });
    global.fetch = jest.fn().mockResolvedValue(
      jsonResponse(401, { statusCode: 401, message: 'Unauthorized' }),
    ) as unknown as typeof fetch;

    const error = await captureError(request('/me/likes', { auth: true }));
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 401 });
  });

  it('omits the Authorization header when no token is stored', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      jsonResponse(200, { statusCode: 200, data: [] }),
    ) as unknown as FetchMock;
    global.fetch = fetchMock as unknown as typeof fetch;

    await request('/me/likes', { auth: true });
    const call = fetchMock.mock.calls[0];
    expect(call[1].headers.Authorization).toBeUndefined();
  });
});
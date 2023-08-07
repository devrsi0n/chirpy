const COOKIE_NAME = 'cp-session-id';

export function getSessionId() {
  const cookie: Record<string, string> = {};
  document.cookie.split(';').forEach(function (el) {
    const [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[COOKIE_NAME];
}

export function setSessionId() {
  /**
   * Try to keep same session id if session cookie exists, generate a new one otherwise.
   *   - First request in a session will generate a new session id
   *   - The next request will keep the same session id and extend the TTL for 30 more minutes
   */
  const sessionId = getSessionId() || getUUIDv4();
  const cookieValue = `${COOKIE_NAME}=${sessionId}; Max-Age=1800; path=/; secure`;

  document.cookie = cookieValue;
}

/**
 * Generate uuid to identify the session. Random, not data-derived
 */
function getUUIDv4(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // @ts-expect-error
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  }
}

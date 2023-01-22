export const USERNAME_RE = /^[\dA-Za-z]+$/;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidDomain(domain: string): boolean {
  try {
    const url = new URL(`https://${domain}`);
    return url.hostname === domain;
  } catch {
    return false;
  }
}

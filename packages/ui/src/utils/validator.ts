export const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidDomain(domain: string): boolean {
  try {
    const url = new URL(`https://${domain}`);
    return url.hostname === domain;
  } catch {
    return false;
  }
}

export const HOME_DOMAINS = [
  'chirpy.dev',
  'staging.chirpy.dev',
  'chirpy-dev.vercel.app',
  'localhost:3000',
];

export function parseSubdomain(host: string) {
  let currentHost = host;
  HOME_DOMAINS.forEach((homeDomain) => {
    currentHost = currentHost.replace(`.${homeDomain}`, '');
  });
  if (currentHost === host) {
    // It's not a subdomain
    return null;
  }
  return currentHost;
}

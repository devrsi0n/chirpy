export function parseSubdomain(hostname: string) {
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
          .replace(`.chirpy.dev`, '')
          .replace(`.chirpy-dev.vercel.app`, '')
      : hostname.replace(`.localhost:3000`, '');
  if (currentHost === hostname) {
    // It's not a subdomain
    return null;
  }
  return currentHost;
}

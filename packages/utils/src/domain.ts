export const HOME_HOSTS = [
  'chirpy-dev.vercel.app',
  'staging.chirpy.dev',
  'notion.chirpy.dev',
  // All subdomains should come before the root domain,
  // or the replacing will not work as expected
  'chirpy.dev',
  'localhost:3000',
];

export function parseSubdomain(host: string) {
  // Vercel preview deployment URLs
  const matchedList = /^(app|widget)\.chirpy-[\da-z\-]+\.vercel\.app$/.exec(
    host,
  );
  if (matchedList?.[1]) {
    return matchedList[1];
  }

  let currentHost = host;
  HOME_HOSTS.forEach((homeDomain) => {
    currentHost = currentHost.replace(`.${homeDomain}`, '');
  });
  if (currentHost === host) {
    // It's not a subdomain
    return null;
  }
  return currentHost;
}

export function isHomeHost(host: string) {
  return (
    HOME_HOSTS.includes(host) || /^chirpy-[\da-z\-]+\.vercel\.app$/.test(host)
  );
}

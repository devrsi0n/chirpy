export function getCacheByPassFetchOptions() {
  return {
    headers: {
      'x-stellate-bypass': 'true',
    },
  };
}

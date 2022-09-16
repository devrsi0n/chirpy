export async function revalidateProjectPages(
  projectId: string,
  domain: string,
) {
  return await Promise.allSettled([
    fetch(`/api/revalidate/widgets?projectId=${projectId}`),
    fetch(`/api/revalidate/theme?domain=${domain}`),
  ]);
}

export function revalidateProjectPages(projectId: string) {
  fetch(`/api/revalidate/widgets?projectId=${projectId}`);
}

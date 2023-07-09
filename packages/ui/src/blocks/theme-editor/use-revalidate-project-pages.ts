import { trpc } from '@chirpy-dev/trpc/src/client';

export function useRevalidateProjectPages(username: string) {
  const { mutateAsync: revalidateWidget } =
    trpc.revalidate.widget.useMutation();
  const { mutateAsync: revalidateUrl } = trpc.revalidate.url.useMutation();

  return async function revalidate(projectId: string, domain: string) {
    await Promise.all([
      revalidateWidget({ projectId }),
      revalidateUrl({
        url: `/dashboard/${username}/${domain}/theme`,
      }),
    ]);
  };
}

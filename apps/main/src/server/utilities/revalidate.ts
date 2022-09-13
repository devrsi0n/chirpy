import { NextApiResponse } from 'next';

export async function revalidateCommentWidgets(
  pageURLs: string[],
  res: NextApiResponse,
) {
  await Promise.allSettled(
    pageURLs.map((url) => revalidateCommentWidget(url, res)),
  );
}

export function revalidateCommentWidget(pageURL: string, res: NextApiResponse) {
  return res.revalidate(`/widget/comment/${encodeURIComponent(pageURL)}`);
}

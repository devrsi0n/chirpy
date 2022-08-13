import { NextApiResponse } from 'next';

export async function revalidateCommentWidget(
  pageURL: string,
  res: NextApiResponse,
) {
  await Promise.allSettled([
    res.revalidate(`/widget/comment/${encodeURIComponent(pageURL)}`),
    // TODO: Revalidate the timeline page
    // res.unstable_revalidate(`/widget/comment/timeline/${pageURL}`),
  ]);
}

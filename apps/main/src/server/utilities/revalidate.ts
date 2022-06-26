import { NextApiResponse } from 'next';

export async function revalidateCommentWidget(
  pageURL: string,
  res: NextApiResponse,
) {
  await Promise.allSettled([
    res.unstable_revalidate(`/widget/comment/${pageURL}`),
    // TODO: Revalidate the timeline page
    // res.unstable_revalidate(`/widget/comment/timeline/${pageURL}`),
  ]);
}

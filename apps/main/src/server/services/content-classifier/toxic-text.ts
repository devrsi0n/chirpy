import '@tensorflow/tfjs-node';
import { NextApiRequest, NextApiResponse } from 'next';

import { getToxicModel } from '$/server/common/api-handler';

export interface IToxicText {
  matchedLabels: string[];
}

export async function checkToxicText(
  req: NextApiRequest,
  res: NextApiResponse<IToxicText>,
): Promise<void> {
  const { text } = req.query as {
    [key: string]: string;
  };
  const model = await getToxicModel();
  const result = await model.classify(text);
  const resp: IToxicText = result.reduce(
    (prev, item) => {
      if (item.results.some((r) => r.match)) {
        prev.matchedLabels.push(item.label.split('_').join(' '));
      }
      return prev;
    },
    { matchedLabels: [] } as IToxicText,
  );
  res.status(200).json(resp);
}

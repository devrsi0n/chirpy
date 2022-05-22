import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';
import { NextApiRequest, NextApiResponse } from 'next';

const MIN_PREDICTION_CONFIDENCE = 0.9;

const modelPromise = toxicity.load(MIN_PREDICTION_CONFIDENCE, [
  'toxicity',
  'severe_toxicity',
  `identity_attack`,
  `insult`,
  `threat`,
  `sexual_explicit`,
  `obscene`,
]);

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
  const model = await modelPromise;
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

import '@tensorflow/tfjs';

import { ICheckToxicText } from '@chirpy-dev/types';
import { isENVDev } from '@chirpy-dev/utils';
import * as toxicity from '@tensorflow-models/toxicity';
import { NextApiRequest, NextApiResponse } from 'next';

const MIN_PREDICTION_CONFIDENCE = 0.9;

export function getToxicModel() {
  // Save the ref to the global env to avoid reload the models between severless calls
  if (!global.toxicModelPromise) {
    global.toxicModelPromise = toxicity.load(MIN_PREDICTION_CONFIDENCE, [
      'toxicity',
      'severe_toxicity',
      `identity_attack`,
      `insult`,
      `threat`,
      `sexual_explicit`,
      `obscene`,
    ]);
  }
  return global.toxicModelPromise;
}

export async function checkToxicText(
  req: NextApiRequest,
  res: NextApiResponse<ICheckToxicText>,
): Promise<void> {
  if (isENVDev) {
    // We can't load @tensorflow/tfjs due to network issues
    return res.status(200).json({
      matchedLabels: [],
    });
  }
  const { text } = req.query as {
    [key: string]: string;
  };
  const model = await getToxicModel();
  const result = await model.classify(text);
  const resp: ICheckToxicText = result.reduce(
    (prev: ICheckToxicText, item) => {
      if (item.results.some((r) => r.match)) {
        prev.matchedLabels.push(item.label.split('_').join(' '));
      }
      return prev;
    },
    { matchedLabels: [] } as ICheckToxicText,
  ) as ICheckToxicText;
  res.status(200).json(resp);
}

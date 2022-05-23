// prettier-ignore-start
import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs-node';
// prettier-ignore-end
import { NextApiRequest, NextApiResponse } from 'next';
import connect, { ErrorHandler } from 'next-connect';

import { ApiError } from './error';

export const handleInternalFailure: ErrorHandler<NextApiRequest, NextApiResponse> = (
  error,
  req,
  res,
) => {
  console.error('internal error', error);
  console.error('query', req.query);
  console.error('body', req.body);

  if (error instanceof ApiError) {
    return res.status(error.httpStatus).send(error.message);
  }

  res.status(500).end(`[Chirpy] error: ${error.toString()}`);
};

export const getApiHandler = () =>
  connect<NextApiRequest, NextApiResponse>({
    onError: handleInternalFailure,
  });

const MIN_PREDICTION_CONFIDENCE = 0.9;

// Load the tfjs models whenever there is a request to the server,
// to speed up the loading process (the models are pretty big)
const toxicModelPromise = toxicity.load(MIN_PREDICTION_CONFIDENCE, [
  'toxicity',
  'severe_toxicity',
  `identity_attack`,
  `insult`,
  `threat`,
  `sexual_explicit`,
  `obscene`,
]);

export function getToxicModel() {
  // Save the ref to the global env to avoid reload the models between severless calls
  if (!global.toxicModelPromise) {
    global.toxicModelPromise = toxicModelPromise;
  }
  return global.toxicModelPromise;
}

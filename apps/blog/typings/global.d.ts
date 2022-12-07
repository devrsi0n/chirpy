/// <reference types="@chirpy-dev/types/src/global" />
import * as toxicity from '@tensorflow-models/toxicity';

declare global {
  // eslint-disable-next-line no-var
  declare var toxicModelPromise: Promise<toxicity.ToxicityClassifier>;
}

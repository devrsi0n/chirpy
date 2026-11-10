/// <reference types="@chirpy-dev/types/src/global" />
import * as toxicity from '@tensorflow-models/toxicity';

declare global {
  declare var toxicModelPromise: Promise<toxicity.ToxicityClassifier>;
  interface Window {
    __env: Record<string, string>;
  }
}

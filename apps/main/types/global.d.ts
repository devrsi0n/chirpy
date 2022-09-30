import * as toxicity from '@tensorflow-models/toxicity';

declare global {
  // eslint-disable-next-line no-var
  declare var toxicModelPromise: Promise<toxicity.ToxicityClassifier>;
  interface Window {
    __env: Record<string, string>;
  }
}

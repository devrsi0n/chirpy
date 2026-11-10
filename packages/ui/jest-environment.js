const { TestEnvironment } = require('jest-environment-jsdom');

module.exports = class BrowserEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    // jsdom does not expose the Web APIs used by MSW's Node interceptors.
    for (const name of [
      'TextEncoder',
      'TextDecoder',
      'ReadableStream',
      'WritableStream',
      'TransformStream',
      'BroadcastChannel',
      'AbortController',
      'AbortSignal',
      'fetch',
      'Request',
      'Response',
      'Headers',
      'FormData',
      'Blob',
      'File',
      'structuredClone',
    ]) {
      this.global[name] = globalThis[name];
    }
  }
};

import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import 'intersection-observer';
import 'whatwg-fetch';
import './mocks/mock-use-session';
import './mocks/mock-framer-motion';

import { server } from './fixtures/server';
import { cleanEvents } from './mocks/next-router';

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
document.elementFromPoint = () => document.body;
Range.prototype.getBoundingClientRect = () => new DOMRect();
Range.prototype.getClientRects = () => [] as unknown as DOMRectList;

beforeAll(() => server.listen({ onUnhandledFrame: 'warn' }));
// afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanEvents();
  server.close();
});

jest.mock('next/dynamic', () => (load: () => Promise<any>) => {
  const React = jest.requireActual('react');
  const DynamicComponent = (props: any) => {
    const [Component, setComponent] = React.useState(null);
    React.useEffect(() => {
      let mounted = true;
      load().then((module: any) => {
        if (mounted) setComponent(() => module.default || module);
      });
      return () => {
        mounted = false;
      };
    }, []);
    return Component ? React.createElement(Component, props) : null;
  };
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

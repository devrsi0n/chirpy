import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import 'intersection-observer';
import 'whatwg-fetch';
import './mocks/mock-use-session';
import './mocks/mock-framer-motion';

import ResizeObserver from 'resize-observer-polyfill';

import { server } from './fixtures/server';
import { cleanEvents } from './mocks/next-router';

global.ResizeObserver = ResizeObserver;

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
// afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanEvents();
  server.close();
});

/* eslint-disable unicorn/consistent-function-scoping */
jest.mock('next/dynamic', () => (func: () => Promise<any>) => {
  let component: any = null;
  func().then((module: any) => {
    component = module.default;
  });
  const DynamicComponent = (...args: any[]) => component(...args);
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

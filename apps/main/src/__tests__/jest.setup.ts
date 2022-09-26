import { setGlobalConfig } from '@storybook/testing-react';

import '@testing-library/jest-dom';
import 'fake-indexeddb/auto';
import 'intersection-observer';
import 'whatwg-fetch';
import './mocks/mock-framer-motion';

import * as globalStorybookConfig from '../../.storybook/preview';
import { server } from './fixtures/server';
import { cleanEvents } from './mocks/next-router';

setGlobalConfig(globalStorybookConfig);

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

jest.mock('rehype-pretty-code', () => () => null);
jest.mock('rehype-autolink-headings', () => () => null);
jest.mock('rehype-slug', () => () => null);

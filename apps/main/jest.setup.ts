import { setGlobalConfig } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import DotEnv from 'dotenv';
import 'intersection-observer';
import 'whatwg-fetch';

import * as globalStorybookConfig from '../storybook/.storybook/preview';
import { server } from '@chirpy/jest/fixtures/server';
import './src/__tests__/mocks/mock-use-current-user';
import { cleanEvents } from './src/__tests__/mocks/next-router';

DotEnv.config({
  path: '.env.local',
});

setGlobalConfig(globalStorybookConfig);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => {
  cleanEvents();
  server.close();
});

// eslint-disable-next-line unicorn/consistent-function-scoping
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
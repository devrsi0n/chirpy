import EventEmitter from 'events';
import { NextRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter() {
    return mockNextRouter;
  },
}));

const emitter = new EventEmitter();

export const mockNextRouter: NextRouter = {
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    on: jest.fn().mockImplementation(emitter.on),
    off: jest.fn().mockImplementation(emitter.off),
    emit: jest.fn().mockImplementation(emitter.emit),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};

export const cleanEvents = () => emitter.removeAllListeners();

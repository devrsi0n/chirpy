import EventEmitter from 'events';
import { NextRouter } from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  // ...jest.requireActual('next/router'),
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
  push: jest.fn().mockResolvedValue(true),
  replace: jest.fn().mockResolvedValue(true),
  reload: jest.fn().mockResolvedValue(true),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn().mockResolvedValue(true),
  beforePopState: jest.fn().mockResolvedValue(true),
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

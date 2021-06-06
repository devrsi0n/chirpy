import { render } from '@testing-library/react';

import { mockRouter } from '$/test/mock-router';

import { TelemetryProvider } from '../TelemetryProvider';

// Defined at jest/mocks/handlers
const MOCK_CACHE = 'mock cache';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

const STORAGE_KEY = 'session.cache';

describe('TelemetryProvider', () => {
  beforeEach(() => {
    render(<TelemetryProvider projectId="random-project-id" />);
  });

  it('should set session when component is mounted', async () => {
    // Wait for telemetry request complete
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });

  it('should set session when route is changed', async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    sessionStorage.clear();
    mockRouter.events.emit('routeChangeComplete');
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });
});

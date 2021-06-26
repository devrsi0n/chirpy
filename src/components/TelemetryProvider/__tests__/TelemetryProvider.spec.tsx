import { render } from '@testing-library/react';

import { mockRouter } from '$/tests/mocks/router';

import { TelemetryProvider } from '../TelemetryProvider';

// Defined at jest/mocks/handlers
const MOCK_CACHE = 'mock cache';

const STORAGE_KEY = 'session.cache';
const SLEEP_TIME = 150;

describe('TelemetryProvider', () => {
  beforeEach(() => {
    render(<TelemetryProvider projectId="random-project-id" />);
  });

  it('should set session when component is mounted', async () => {
    // Wait for telemetry request complete
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });

  it('should set session when route is changed', async () => {
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    sessionStorage.clear();
    mockRouter.events.emit('routeChangeComplete');
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });
});

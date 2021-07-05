import { render } from '@testing-library/react';

import { MOCK_CACHE } from '$/__tests__/fixtures/server/handlers';
import { mockNextRouter, cleanEvents } from '$/__tests__/mocks/nextRouter';

import { TelemetryProvider } from '../TelemetryProvider';

const STORAGE_KEY = 'session.cache';
const SLEEP_TIME = 150;

describe('TelemetryProvider', () => {
  beforeEach(() => {
    render(<TelemetryProvider projectId="random-project-id" />);
  });

  afterAll(() => {
    cleanEvents();
  });

  it('should set session when component is mounted', async () => {
    // Wait for telemetry request complete
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });

  it('should set session when route is changed', async () => {
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    sessionStorage.clear();
    // TODO: Use next-router-mock instead
    mockNextRouter.events.emit('routeChangeComplete');
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });
});

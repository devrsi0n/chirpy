import { render } from '@testing-library/react';

import { MOCK_CACHE } from '$/__tests__/fixtures/server/rest-handlers';
import { mockNextRouter, cleanEvents } from '$/__tests__/mocks/nextRouter';

import { TelemetryProvider } from '../TelemetryProvider';

const STORAGE_KEY = 'session.cache';
const SLEEP_TIME = 250;

describe('TelemetryProvider', () => {
  beforeEach(() => {
    //@ts-ignore
    delete window.location;
    //@ts-ignore
    window.location = new URL('https://www.example.com');
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
    mockNextRouter.events.emit('routeChangeComplete');
    await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    expect(sessionStorage.getItem(STORAGE_KEY)).toBe(MOCK_CACHE);
  });
});

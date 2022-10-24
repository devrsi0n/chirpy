import { cleanup, screen } from '@testing-library/react';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import { Header } from '..';

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1920,
});

describe('Header', () => {
  beforeEach(() => {
    pageRender(<Header />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render basic links', () => {
    expect(screen.queryAllByText(/docs/i)).toHaveLength(2);
    expect(screen.queryAllByText(/blog/i)).toHaveLength(2);
  });
});

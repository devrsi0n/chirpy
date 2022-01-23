import { cleanup, render, screen } from '@testing-library/react';

import { ClientOnly } from '../client-only';

const text = 'Test client only';

describe('ClientOnly', () => {
  beforeEach(() => {
    render(<ClientOnly>{text}</ClientOnly>);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render text on client', () => {
    expect(screen.queryByText(text)).toBeTruthy();
  });
});

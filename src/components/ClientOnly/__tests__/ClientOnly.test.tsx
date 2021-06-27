import { cleanup, render, screen } from '@testing-library/react';

import { ClientOnly } from '../ClientOnly';

const text = 'Test client only';

describe('ClientOnly', () => {
  beforeEach(() => {
    render(<ClientOnly>{text}</ClientOnly>);
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('should render text on client', () => {
    expect(screen.queryByText(text)).toBeTruthy();
  });
});

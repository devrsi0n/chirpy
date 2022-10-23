import { cleanup, render, screen } from '@testing-library/react';

import { Divider } from '..';

describe('Divider', () => {
  beforeEach(() => {
    render(<Divider />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render a divider', () => {
    expect(screen.queryByRole('separator')).toBeTruthy();
  });
});

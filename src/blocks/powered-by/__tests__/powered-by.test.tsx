import { cleanup, render, screen } from '@testing-library/react';

import { PoweredBy } from '../powered-by';

describe('PowerBy', () => {
  beforeEach(() => {
    render(<PoweredBy />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the text', () => {
    expect(screen.getByText('Powered by')).toBeTruthy();
  });
});

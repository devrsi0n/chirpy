import { cleanup, render, screen } from '@testing-library/react';

import { Code } from '..';

const text = 'Test code';

describe('Code', () => {
  beforeEach(() => {
    render(<Code>{text}</Code>);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render code', () => {
    expect(screen.queryByText(text)).toBeTruthy();
  });
});

import { render, screen, cleanup } from '@testing-library/react';
import * as React from 'react';

import { Text } from '../Text';

describe('Text', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('should render avatar', async () => {
    render(<Text bold>This is a bold text</Text>);
    expect(screen.getByText('This is a bold text').tagName).toBe('STRONG');

    render(<Text underline>This is a underline text</Text>);
    expect(screen.getByText('This is a underline text').tagName).toBe('U');

    render(<Text italic>This is a italic text</Text>);
    expect(screen.getByText('This is a italic text').tagName).toBe('EM');
  });
});

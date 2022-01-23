import { render, screen, cleanup } from '@testing-library/react';
import * as React from 'react';

import { Avatar } from '../avatar';

describe('Avatar', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render avatar', async () => {
    const mockAlt = 'This is a testing avatart alt';
    render(<Avatar src="http://example.com" alt={mockAlt} />);
    expect(screen.getByAltText(mockAlt)).toBeTruthy();
  });

  it('should render a placeholder if no src', () => {
    render(<Avatar />);
    expect(screen.getByLabelText(/avatar placeholder/i)).toBeTruthy();
  });
});

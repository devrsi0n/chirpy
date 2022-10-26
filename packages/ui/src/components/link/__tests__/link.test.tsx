import { render, screen, cleanup } from '@testing-library/react';
import * as React from 'react';

import { Link } from '../link';

describe('Link', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correct target for external link', async () => {
    const ariaLabel = 'Link label';
    render(<Link href="http://example.com" aria-label={ariaLabel} />);
    const link: HTMLAnchorElement = screen.getByLabelText(
      ariaLabel,
    ) as HTMLAnchorElement;
    expect(link.target).toBe('_blank');
  });

  it('should render correct target for inner link', async () => {
    const ariaLabel = 'Link label';
    render(<Link href={window.location.origin} aria-label={ariaLabel} />);
    const link: HTMLAnchorElement = screen.getByLabelText(
      ariaLabel,
    ) as HTMLAnchorElement;
    expect(link.target).toBe('_self');
  });
});

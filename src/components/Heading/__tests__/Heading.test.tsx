import { cleanup, render, screen } from '@testing-library/react';

import { Heading } from '../';

const text = 'heading testing';

describe('Heading', () => {
  beforeEach(() => {
    render(<Heading as="h2">{text}</Heading>);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render heading 2', () => {
    expect(screen.queryByRole('heading')?.textContent).toEqual(text);
    expect(screen.queryByRole('heading')?.tagName).toEqual('H2');
  });
});

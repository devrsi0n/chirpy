import { cleanup, render, screen } from '@testing-library/react';

import { CommentBranch } from '..';

const text = 'branch';
describe('CommentBranch', () => {
  beforeEach(() => {
    render(
      <CommentBranch>
        <span>{text}</span>
      </CommentBranch>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the branch', () => {
    expect(screen.queryByText(text)).toBeTruthy();
  });
});

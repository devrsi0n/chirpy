import { cleanup, render, screen } from '@testing-library/react';

import {
  generateCommentFragment,
  getTextsOfComment,
} from '@chirpy/blocks/comment-linked-list/__tests__/mock-data';

import { CommentTrees } from '..';

const mockOnSubmitReply = jest.fn();
const mockOnClickLikeAction = jest.fn();
const mockComments = [
  {
    ...generateCommentFragment('1'),
    replies: [generateCommentFragment('sub-1')],
  },
  {
    ...generateCommentFragment('2'),
    replies: [generateCommentFragment('sub-2')],
  },
];

describe('CommentTrees', () => {
  beforeEach(() => {
    render(
      <CommentTrees
        comments={mockComments as any}
        onSubmitReply={mockOnSubmitReply}
        onClickLikeAction={mockOnClickLikeAction}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the content texts', () => {
    const texts = mockComments.map((comment) => getTextsOfComment(comment));
    for (const text of texts) {
      expect(screen.queryByText(text.text)).toBeTruthy();
      for (const reply of text.replies) {
        expect(screen.queryByText(reply)).toBeTruthy();
      }
    }
  });
});

import { cleanup, render, screen } from '@testing-library/react';

import { CommentLinkedList } from '../CommentLinkedList';
import { generateComment, getTextsOfComment } from './mockData';

const mockHandleSubmitReply = jest.fn();
const mockHandleClickLikeAction = jest.fn();
const mockComment = generateComment();

describe('CommentLinkedList', () => {
  beforeEach(() => {
    render(
      <CommentLinkedList
        comment={mockComment}
        onSubmitReply={mockHandleSubmitReply}
        onClickLikeAction={mockHandleClickLikeAction}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the comments', () => {
    const { parent, text, replies } = getTextsOfComment(mockComment);
    expect(screen.queryByText(parent.text)).toBeInTheDocument();
    expect(screen.queryByText(text)).toBeInTheDocument();
    for (const reply of replies) {
      expect(screen.queryByText(reply)).toBeInTheDocument();
    }
  });
});

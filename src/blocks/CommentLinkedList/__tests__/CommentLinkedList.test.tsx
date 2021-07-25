import { cleanup, render, screen, waitFor } from '@testing-library/react';

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

  it('should render the comments', async () => {
    const { parent, text, replies } = getTextsOfComment(mockComment);
    await waitFor(() => expect(screen.getByText(parent.text)).toBeInTheDocument());
    expect(screen.getByText(text)).toBeInTheDocument();
    for (const reply of replies) {
      expect(screen.getByText(reply)).toBeInTheDocument();
    }
  });
});

import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '$/__tests__/fixtures/page-render';

import { CommentCard } from '../';
import { generateCommentCard } from './mockData';

const mockHandleSubmitReply = jest.fn().mockResolvedValue(null);
const mockHandleClickLikeAction = jest.fn();

const staticProps = generateCommentCard(1);

describe('CommentCard', () => {
  beforeEach(() => {
    pageRender(
      <CommentCard
        {...staticProps}
        onClickLikeAction={mockHandleClickLikeAction}
        onSubmitReply={mockHandleSubmitReply}
      ></CommentCard>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the text', () => {
    expect(screen.getByText(staticProps.author.name)).toBeInTheDocument();
    expect(screen.getByText(staticProps.content[0].children[0].text)).toBeInTheDocument();

    expect((document.querySelector('time') as HTMLTimeElement).dateTime).toBe(
      staticProps.createdAt,
    );
  });

  it('should call the handler when clicking the like button', () => {
    const likeButton = screen.getByLabelText('Like');
    userEvent.click(likeButton);
    expect(mockHandleClickLikeAction).toHaveBeenCalledWith(false, '', staticProps.commentId);
  });

  it('should call the handler when clicking the reply button', async () => {
    const replyButton = screen.getByRole('button', {
      name: 'Reply',
    });
    userEvent.click(replyButton);
    await waitFor(() => screen.getByRole('textbox'));
    // const text = 'This is a testing comment';
    // const rte = screen.getByRole('textbox');
    // fireEvent.blur(rte, {
    //   target: { innerHTML: rteHTML },
    // });
    const postButton = screen.getByRole('button', {
      name: 'Post',
    });
    userEvent.click(postButton);
    await waitFor(() => expect(mockHandleSubmitReply).toHaveBeenCalled());
  });
});

import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockCurrentUserProvider } from '$/tests/mocks/CurrentUserProvider';

import { CommentCard } from '../';

const mockHandleSubmitReply = jest.fn().mockResolvedValue(null);
const mockHandleClickLikeAction = jest.fn();

const staticProps = generateCommentCard('1');

describe('CommentCard', () => {
  beforeEach(() => {
    const { debug } = render(
      <MockCurrentUserProvider>
        <CommentCard
          {...staticProps}
          onClickLikeAction={mockHandleClickLikeAction}
          onSubmitReply={mockHandleSubmitReply}
        ></CommentCard>
      </MockCurrentUserProvider>,
    );
    debug();
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the text', () => {
    expect(screen.queryByText(staticProps.author.displayName)).toBeInTheDocument();
    expect(screen.queryByText(staticProps.content[0].children[0].text)).toBeInTheDocument();

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
    await waitFor(() => screen.queryByRole('textbox'));
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

function generateCommentCard(fill: string) {
  return {
    commentId: `comment-id-${fill}`,
    author: {
      id: `author-id-${fill}`,
      displayName: `author-name-${fill}`,
      avatar: `author-avatar-${fill}`,
    },
    content: [
      {
        type: 'paragraph',
        children: [{ text: `comment content ${fill}` }],
      },
    ],
    createdAt: `2021-06-21T14:12:13.813625+00:00`,
    likes: [
      {
        id: `like-id-${fill}`,
        userId: `like-user-id-${fill}`,
      },
    ],
    depth: 1,
  };
}

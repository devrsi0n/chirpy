import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '$/__tests__/fixtures/page-render';
import { EDITABLE_PROJECT_IDS } from '$/__tests__/mocks/editable-project-ids';
import * as CommentContext from '$/contexts/CommentContext/CommentContextProvider';

import { CommentCard } from '../';
import { generateCommentCard } from './mockData';

const mockDeleteAComment = jest.fn();
jest.spyOn(CommentContext, 'useCommentContext').mockImplementation(() => ({
  projectId: EDITABLE_PROJECT_IDS[0],
  deleteAComment: mockDeleteAComment,
}));

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
    expect(screen.getByText(staticProps.content.content[0].content[0].text)).toBeInTheDocument();

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
    await waitFor(() => screen.getByLabelText('Reply editor'));
    // const textbox = screen.getByRole('textbox').querySelector('p')!;
    // TODO: figure out why type is not working
    // userEvent.type(textbox, 'This is a testing message');
    expect(
      screen.getByRole('button', {
        name: 'Post',
      }),
    ).toBeTruthy();
  });

  it('should delete comment after clicking the button', async () => {
    const menu = screen.getByRole('button', {
      name: /click to open the menu/i,
    });
    userEvent.click(menu);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete',
    });
    userEvent.click(deleteButton);
    await waitFor(() =>
      screen.getAllByRole('button', {
        name: /confirm/i,
      }),
    );
    const confirmWrapper = screen.getByRole('button', {
      name: /are you sure\? confirm/i,
    });

    const confirmButton = within(confirmWrapper).getByRole('button', {
      name: /confirm/i,
    });
    userEvent.click(confirmButton);
    await waitFor(() => expect(mockDeleteAComment).toHaveBeenCalled());
  });
});

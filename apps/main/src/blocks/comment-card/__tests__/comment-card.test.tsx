import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '$/__tests__/fixtures/page-render';
import { EDITABLE_PROJECT_IDS } from '$/__tests__/mocks/data/editable-project-ids';
import * as CommentContext from '$/contexts/comment-context/comment-context-provider';

import { CommentCard } from '..';
import { generateCommentCard } from './mock-data';

jest.mock('$/contexts/comment-context/comment-context-provider', () => {
  return {
    // Make exported object configurable
    __esModule: true,
    ...jest.requireActual(
      '$/contexts/comment-context/comment-context-provider',
    ),
  };
});

const mockDeleteAComment = jest.fn();
jest.spyOn(CommentContext, 'useCommentContext').mockImplementation(() => ({
  pageId: 'a-page-id',
  projectId: EDITABLE_PROJECT_IDS[0],
  deleteAComment: mockDeleteAComment,
  toggleALikeAction: mockHandleClickLikeAction,
  createAComment: mockHandleSubmitReply,
  onClickCommentTimeline: jest.fn(),
}));

const mockHandleSubmitReply = jest.fn().mockResolvedValue(null);
const mockHandleClickLikeAction = jest.fn();

const staticProps = generateCommentCard(1);

describe('CommentCard', () => {
  beforeEach(() => {
    pageRender(<CommentCard {...staticProps} depth={1}></CommentCard>);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the text', () => {
    expect(screen.getByText(staticProps.author.name)).toBeInTheDocument();
    expect(
      screen.getByText(staticProps.content.content[0].content[0].text),
    ).toBeInTheDocument();

    expect((document.querySelector('time') as HTMLTimeElement).dateTime).toBe(
      staticProps.createdAt,
    );
  });

  it('should call the handler when clicking the like button', async () => {
    const likeButton = screen.getByLabelText('Like');
    await userEvent.click(likeButton);
    expect(mockHandleClickLikeAction).toHaveBeenCalledWith(
      false,
      '',
      staticProps.commentId,
    );
  });

  it('should call the handler when clicking the reply button', async () => {
    const replyButton = screen.getByRole('button', {
      name: 'Reply',
    });
    await userEvent.click(replyButton);
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
    await userEvent.click(menu);
    const deleteButton = screen.getByRole('button', {
      name: 'Delete',
    });
    await userEvent.click(deleteButton);
    await waitFor(() =>
      screen.getAllByRole('button', {
        name: /delete/i,
      }),
    );
    const confirmWrapper = screen.getByLabelText(/popover panel/i);

    const confirmButton = within(confirmWrapper).getByRole('button', {
      name: /delete/i,
    });
    await userEvent.click(confirmButton);
    await waitFor(() => expect(mockDeleteAComment).toHaveBeenCalled());
  });
});

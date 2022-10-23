import { cleanup, screen } from '@testing-library/react';

import { pageRender } from '$/__tests__/fixtures/page-render';
import {
  generateCommentFragment,
  getTextsOfComment,
} from '../../blocks/comment-timeline/__tests__/mock-data';
import * as CommentContext from '../../contexts/comment-context/comment-context-provider';

import { CommentTrees } from '..';

jest.mock('../../contexts/comment-context/comment-context-provider', () => {
  return {
    // Make exported object configable
    __esModule: true,
    ...jest.requireActual(
      '../../contexts/comment-context/comment-context-provider',
    ),
  };
});

const mockOnSubmitReply = jest.fn();
const mockOnClickLikeAction = jest.fn();
jest.spyOn(CommentContext, 'useCommentContext').mockImplementation(() => ({
  pageId: 'a-page-id',
  projectId: 'a-project-id',
  deleteAComment: jest.fn(),
  toggleALikeAction: mockOnClickLikeAction,
  createAComment: mockOnSubmitReply,
  onClickCommentTimeline: jest.fn(),
}));
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
    pageRender(<CommentTrees comments={mockComments as any} />);
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

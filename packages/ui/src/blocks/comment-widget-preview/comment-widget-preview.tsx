import { Like, User } from '@chirpy-dev/trpc/src/ui';
import { RTEValue } from '@chirpy-dev/types';
import * as React from 'react';

import { useToast } from '../../components/toast';
import {
  CommentContext,
  CommentContextType,
  UseCreateAComment,
  UseDeleteAComment,
  UseToggleALikeAction,
} from '../../contexts/comment-context';
import { useCurrentUser } from '../../contexts/current-user-context';
import { CommentLeafType } from '../../types';
import { CommentForest } from '../comment-forest';
import { PredefinedCurrentUser } from './predefined-current-user';
import { PredefinedNotification } from './predefined-notification';
import { getPreviewComments, PAGE_ID, PROJECT_ID } from './preview-data';

export interface CommentWidgetPreviewProps {
  rtePlaceholder?: string;
  buildDate: string;
}

/**
 * Comment widget preview, used by theme editor and home page
 */
export function CommentWidgetPreview(
  props: CommentWidgetPreviewProps,
): JSX.Element {
  return (
    <PredefinedCurrentUser>
      <PredefinedNotification>
        <CommentWidgetPreviewInternal {...props} />
      </PredefinedNotification>
    </PredefinedCurrentUser>
  );
}

function CommentWidgetPreviewInternal(
  props: CommentWidgetPreviewProps,
): JSX.Element {
  const { data } = useCurrentUser();
  const [previewComments, setPreviewComments] = React.useState<
    CommentLeafType[]
  >(() => getPreviewComments(props.buildDate));

  const createAComment: UseCreateAComment = React.useCallback(
    async (reply: RTEValue, commentId?: string | undefined) => {
      const newComment: CommentLeafType = {
        id: `${String(Math.random()).slice(2)}`,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        content: reply!,
        parentId: commentId || null,
        pageId: PAGE_ID,
        createdAt: new Date(),
        user: {
          id: data.id || '',
          name: data.name || '',
          image: data.image || '',
        } as User,
        replies: [],
        likes: [],
      } as unknown as CommentLeafType;

      if (!commentId) {
        // This is a root comment
        setPreviewComments((prevData) => [...prevData, newComment]);
        return;
      }
      setPreviewComments((prevData) => {
        const comment = findCommentById(prevData, commentId);
        if (comment) {
          comment.replies.push(newComment);
        }
        return [...prevData];
      });
    },
    [data],
  );

  const deleteAComment: UseDeleteAComment = React.useCallback(
    async (commentId: string) => {
      setPreviewComments((prevData) => {
        return deleteACommentById(prevData, commentId);
      });
      return;
    },
    [],
  );

  const toggleALikeAction: UseToggleALikeAction = React.useCallback(
    async (isLiked: boolean, likeId: string, commentId: string) => {
      setPreviewComments((prevData) => {
        const comment = findCommentById(prevData, commentId);
        if (comment) {
          comment.likes = comment.likes.filter((like) => like.id !== likeId);
          if (!isLiked) {
            comment.likes.push({
              id: likeId,
              userId: data.id || '',
            } as unknown as Like);
          }
        }
        return [...prevData];
      });
    },
    [data.id],
  );
  const { showToast } = useToast();
  const onClickCommentTimeline = React.useCallback(() => {
    showToast({
      title: `You clicked a comment's timeline`,
      type: 'info',
    });
  }, [showToast]);
  const commentContext: CommentContextType = React.useMemo(
    () => ({
      pageId: PAGE_ID,
      projectId: PROJECT_ID,
      createAComment,
      deleteAComment,
      toggleALikeAction,
      onClickCommentTimeline,
    }),
    [createAComment, deleteAComment, toggleALikeAction, onClickCommentTimeline],
  );
  return (
    <CommentContext.Provider value={commentContext}>
      <CommentForest
        comments={previewComments}
        rtePlaceholder={props.rtePlaceholder || 'Preview'}
      />
    </CommentContext.Provider>
  );
}

function findCommentById(
  comments: CommentLeafType[],
  id: string,
): CommentLeafType | undefined {
  return findCommentByIdInternal(comments, id)[0];
}

function findCommentByIdInternal(
  comments: CommentLeafType[],
  id: string,
  result: CommentLeafType[] = [],
): CommentLeafType[] {
  for (const comment of comments) {
    if (comment.id === id) {
      result.push(comment);
      break;
    } else {
      findCommentByIdInternal(comment.replies as CommentLeafType[], id, result);
    }
  }
  return result;
}

function deleteACommentById(
  comments: CommentLeafType[],
  id: string,
): CommentLeafType[] {
  const newComments: CommentLeafType[] = [];
  for (const comment of comments) {
    if (comment.id === id) {
      comment.deletedAt = new Date();
    }

    comment.replies = deleteACommentById(
      comment.replies as CommentLeafType[],
      id,
    );

    newComments.push(comment);
  }
  return newComments;
}

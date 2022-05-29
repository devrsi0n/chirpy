import * as React from 'react';

import {
  CommentContext,
  CommentContextType,
  UseCreateAComment,
  UseDeleteAComment,
  UseToggleALikeAction,
} from '$/contexts/comment-context';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { CommentLeafType } from '$/types/widget';

import { CommentTrees } from '../comment-trees';
import { RTEValue } from '../rich-text-editor';
import { PAGE_ID, PREVIEW_COMMENTS, PROJECT_ID } from './preview-data';

/**
 * Comment widget preview, used by theme editor
 */
export function CommentWidgetPreview(): JSX.Element {
  const { data } = useCurrentUser();
  const [previewComments, setPreviewComments] = React.useState<CommentLeafType[]>(
    PREVIEW_COMMENTS as CommentLeafType[],
  );
  const createAComment: UseCreateAComment = React.useCallback(
    async (reply: RTEValue, commentId?: string | undefined) => {
      const newComment: CommentLeafType = {
        id: `${String(Math.random()).slice(2)}`,
        content: reply,
        parentId: commentId,
        pageId: PAGE_ID,
        createdAt: new Date().toISOString(),
        user: {
          id: data.id || '',
          name: data.name || '',
          avatar: data.avatar || '',
        },
        replies: [],
        likes: [],
      };

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

  const deleteAComment: UseDeleteAComment = React.useCallback(async (commentId: string) => {
    setPreviewComments((prevData) => {
      return deleteACommentById(prevData, commentId);
    });
    return;
  }, []);

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
            });
          }
        }
        return [...prevData];
      });
    },
    [data.id],
  );
  const commentContext: CommentContextType = React.useMemo(
    () => ({
      pageId: PAGE_ID,
      projectId: PROJECT_ID,
      createAComment,
      deleteAComment,
      toggleALikeAction,
    }),
    [createAComment, deleteAComment, toggleALikeAction],
  );
  return (
    <CommentContext.Provider value={commentContext}>
      <CommentTrees comments={previewComments} rtePlaceholder="Preview" />
    </CommentContext.Provider>
  );
}

function findCommentById(comments: CommentLeafType[], id: string): CommentLeafType | null {
  for (const comment of comments) {
    if (comment.id === id) {
      return comment;
    }
    return findCommentById(comment.replies as CommentLeafType[], id);
  }
  return null;
}

function deleteACommentById(comments: CommentLeafType[], id: string): CommentLeafType[] {
  const newComments: CommentLeafType[] = [];
  for (const comment of comments) {
    if (comment.id === id) {
      continue;
    }
    if (comment.replies.length > 0) {
      comment.replies = deleteACommentById(comment.replies as CommentLeafType[], id);
    }
    newComments.push(comment);
  }
  return newComments;
}

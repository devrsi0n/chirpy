import * as React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Heart from '@geist-ui/react-icons/heart';
import HeartFill from '@geist-ui/react-icons/heartFill';
import { MessageIcon } from '$/components/Icons/Message.Icon';

import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { Node } from 'slate';
import { RichTextEditor } from './RichTextEditor/RichTextEditor';
import { Like } from '@prisma/client';
import { ActionButton } from '$/components/buttons/ActionButton';

dayjs.extend(relativeTime);

export type CommentProps = {
  id: string;
  name: string;
  avatar: string;
  content: Node[];
  date: string;
  userId?: string;
  likeList: Like[];
  onClickLike(liked: boolean, commentId: string, likedId: string): void;
};

function Comment({
  id,
  avatar,
  name,
  content,
  date,
  userId,
  likeList,
  onClickLike,
}: CommentProps): JSX.Element {
  let likedId = '';
  const liked =
    !!userId &&
    likeList.some((like) => {
      if (like.userId === userId) {
        likedId = like.id;
        return true;
      }
      return false;
    });
  const handleClickLike = () => {
    onClickLike(liked, id, likedId);
  };
  const HeartComponent = liked ? HeartFill : Heart;

  return (
    <section className="flex flex-row items-start space-x-2 py-2">
      <Avatar size="md" src={avatar} alt={`User ${name}'s avatar`} />
      <div className="bg-gray-50 px-6 py-4 rounded-r-3xl rounded-bl-3xl space-y-2">
        <div className="flex flex-row items-center space-x-4">
          <Text>{name}</Text>
          <Text as="time" variant="xs" title={date} className="text-text-light cursor-default">
            {dayjs(date).fromNow()}
          </Text>
        </div>
        <RichTextEditor value={content} readOnly />
        <div className="flex flex-row items-center space-x-6">
          <ActionButton
            color="pink"
            activated={liked}
            icon={<HeartComponent size={20} onClick={handleClickLike} />}
          >
            {!!likeList.length && <span>{likeList.length}</span>}
          </ActionButton>
          <ActionButton
            color="indigo"
            icon={
              <MessageIcon
                width={20}
                height={20}
                style={{
                  transform: 'scaleX(-1)',
                }}
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

const MemoComment = React.memo(Comment);
export { MemoComment as Comment };

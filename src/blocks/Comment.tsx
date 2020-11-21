import * as React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import { Node } from 'slate';
import { RichTextEditor } from './RichTextEditor/RichTextEditor';

dayjs.extend(relativeTime);

export type CommentProps = {
  name: string;
  avatar: string;
  content: Node[];
  date: string;
};

export function Comment({ avatar, name, content, date }: CommentProps): JSX.Element {
  return (
    <section className="flex flex-row items-start space-x-2 py-2">
      <Avatar size="lg" src={avatar} alt={`User ${name}'s avatar`} />
      <div className="bg-gray-50 px-6 py-4 rounded-r-3xl rounded-bl-3xl space-y-1">
        <div className="flex flex-row items-center space-x-4">
          <Text>{name}</Text>
          <Text as="time" variant="xs" title={date} className="text-text-light cursor-default">
            {dayjs(date).fromNow()}
          </Text>
        </div>
        <RichTextEditor value={content} readOnly />
      </div>
    </section>
  );
}

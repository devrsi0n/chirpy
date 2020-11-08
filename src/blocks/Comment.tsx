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
      <div className="bg-gray-300 px-6 py-4 rounded-r-3xl rounded-bl-3xl space-y-1">
        <p className="text-accent">{name}</p>
        <RichTextEditor value={content} readOnly />
        <Text variant="xs" title={date} className="text-right">
          {dayjs(date).fromNow()}
        </Text>
      </div>
    </section>
  );
}

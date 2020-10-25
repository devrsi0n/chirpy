import { Avatar } from '$/components/Avatar';
import { Text } from '$/components/Text';
import * as React from 'react';

export type CommentProps = {
  name: string;
  avatar: string;
  content: string;
  date: string;
};

export function Comment({ avatar, name, content, date }: CommentProps): JSX.Element {
  return (
    <section className="flex flex-row items-center space-x-2 py-2">
      <Avatar size="lg" src={avatar} alt={`User ${name}'s avatar`} />
      <div>
        <p className="text-blue-500">{name}</p>
        <Text>{content}</Text>
        <Text variant="secondary" className="text-xs">
          {date}
        </Text>
      </div>
    </section>
  );
}

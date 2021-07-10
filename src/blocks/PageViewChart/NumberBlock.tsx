import ArrowUp from '@geist-ui/react-icons/arrowUp';
import * as React from 'react';
import tw from 'twin.macro';

import { Text } from '$/components/Text';

export type NumberBlockProps = {
  value: number;
  text: string;
  diffs: number;
};

export function NumberBlock({ value, text, diffs }: NumberBlockProps): JSX.Element {
  return (
    <div tw="flex flex-col">
      <div tw="flex flex-row items-center space-x-2">
        <Text bold tw="text-3xl" aria-label={text}>
          {value}
        </Text>
        <div tw="flex flex-row items-center space-x-0.5">
          <span css={getArrowStyles(diffs)}>
            <ArrowUp size="16" />
          </span>
          <Text tw="text-sm">{diffs * 100}%</Text>
        </div>
      </div>
      <Text tw="text-gray-400">{text}</Text>
    </div>
  );
}

function getArrowStyles(diffs: number) {
  if (diffs > 0) {
    return tw`text-green-500`;
  } else if (diffs < 0) {
    return tw`text-yellow-500 transform -scale-y-1`;
  }
  return tw`transform rotate-90`;
}

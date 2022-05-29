import Info from '@geist-ui/react-icons/info';
import * as React from 'react';

import { ActionButton, ButtonProps } from '$/components/button';
import { useCommentContext } from '$/contexts/comment-context';

type TimelineLinkButtonProps = {
  href: string;
} & Pick<ButtonProps, 'onClick' | 'disabled'>;

export function TimelineLinkButton({
  disabled,
  href,
  onClick,
}: TimelineLinkButtonProps): JSX.Element {
  const { onClickCommentTimeline } = useCommentContext();
  return (
    <span
      onClick={(e) => {
        if (disabled) {
          onClick?.(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
          return;
        }
        onClickCommentTimeline(href);
      }}
      className="flex justify-center"
    >
      <ActionButton
        color="green"
        icon={<Info size={20} />}
        disabled={disabled}
        title={
          disabled ? `This is already the current comment's timeline` : `This comment's timeline`
        }
      />
    </span>
  );
}

import { ActionButton, ButtonProps, IconInfo } from '@chirpy-dev/ui';
import * as React from 'react';

import { useCommentContext, useCurrentUser } from '$/contexts';

type TimelineLinkButtonProps = {
  href: string;
} & Pick<ButtonProps, 'onClick' | 'disabled'>;

export function TimelineLinkButton({
  disabled,
  href,
  onClick,
}: TimelineLinkButtonProps): JSX.Element {
  const { isPreview } = useCurrentUser();
  const { onClickCommentTimeline } = useCommentContext();
  if (isPreview) {
    return <></>;
  }
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
        icon={<IconInfo size={20} />}
        disabled={disabled}
        title={
          disabled
            ? `This is already the current comment's timeline`
            : `This comment's timeline`
        }
      />
    </span>
  );
}

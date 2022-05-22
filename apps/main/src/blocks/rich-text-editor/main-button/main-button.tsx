import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import * as React from 'react';

import { Button, ButtonProps } from '$/components/button';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useNotificationContext } from '$/contexts/notification-context';
import { useAsync } from '$/hooks/use-async';
import type { IToxicText } from '$/server/services/content-classifier/toxic-text';
import { getTextFromRteValue } from '$/utilities/isomorphic/text';

import { SignInButton } from '../../sign-in-button';
import { RTEValue } from '../type';
import { AskNotificationPermissionPopover } from './ask-notification-permission-panel';
import { ToxicTextPopover } from './toxic-text-popover';

export interface IMainButtonProps {
  disabled?: boolean;
  isReply?: boolean;
  onClickDismiss?: () => void;
  rteValue: RTEValue;
  onClickSubmit: () => Promise<void>;
}

export function MainButton({
  isReply,
  onClickDismiss,
  onClickSubmit,
  disabled,
  rteValue,
}: IMainButtonProps): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const {
    status,
    execute: handleCheckToxicTextBeforeSubmit,
    data,
  } = useAsync(async () => {
    const resp = await fetch(
      `/api/content-classifier/toxic-text?text=${getTextFromRteValue(rteValue)}`,
    );

    const toxicText: IToxicText = await resp.json();
    if (toxicText.matchedLabels.length === 0) {
      await onClickSubmit();
    }
    return toxicText.matchedLabels;
  });

  const { registerNotification, didRegister, didDeny } = useNotificationContext();
  const handleCheckNotificationBeforeSubmit = async () => {
    await registerNotification();
    await handleCheckToxicTextBeforeSubmit();
  };
  const isLoading = status === 'pending';
  const postButtonProps: Partial<ButtonProps> = {
    size: 'sm',
    variant: 'solid',
    color: 'primary',
    disabled: isLoading || disabled,
    'aria-label': isLoading ? 'Posting' : 'Post',
  };
  const buttonChildren = (
    <>
      {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Send size="14" />}
      <span>Post</span>
    </>
  );
  return (
    <div className="flex flex-row justify-end space-x-2">
      {isReply && (
        <Button variant="text" size="sm" onClick={onClickDismiss}>
          Cancel
        </Button>
      )}
      {isSignIn ? (
        didRegister || didDeny ? (
          <ToxicTextPopover
            {...postButtonProps}
            onClickOK={handleCheckToxicTextBeforeSubmit}
            toxicLabels={data}
          >
            {buttonChildren}
          </ToxicTextPopover>
        ) : (
          <AskNotificationPermissionPopover
            onClickAskNextTime={handleCheckToxicTextBeforeSubmit}
            onClickSure={handleCheckNotificationBeforeSubmit}
            buttonProps={{ ...postButtonProps, className: `py-[7px]` }}
          >
            {buttonChildren}
          </AskNotificationPermissionPopover>
        )
      ) : (
        <SignInButton size="sm" />
      )}
    </div>
  );
}

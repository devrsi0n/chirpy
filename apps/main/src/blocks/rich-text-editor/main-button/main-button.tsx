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
import { AskNotificationPermissionPopover } from './ask-notification-permission-popover';
import { ToxicTextDialog } from './toxic-text-dialog';

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
    data: toxicLabels,
    reset,
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
  const [askNextTime, setAskNextTime] = React.useState(false);
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
        didRegister || didDeny || askNextTime ? (
          <ToxicTextDialog
            buttonProps={postButtonProps}
            onClickSubmit={handleCheckToxicTextBeforeSubmit}
            onClickAckToxicComment={reset}
            toxicLabels={toxicLabels}
          >
            {buttonChildren}
          </ToxicTextDialog>
        ) : (
          <AskNotificationPermissionPopover
            onClickAskNextTime={() => {
              setAskNextTime(true);
              handleCheckToxicTextBeforeSubmit();
            }}
            onClickSure={() => {
              setAskNextTime(false);
              handleCheckNotificationBeforeSubmit();
            }}
            buttonProps={postButtonProps}
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

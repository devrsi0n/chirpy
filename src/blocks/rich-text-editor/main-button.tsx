import Loader from '@geist-ui/react-icons/loader';
import Send from '@geist-ui/react-icons/send';
import * as React from 'react';
import tw from 'twin.macro';

import { Button, ButtonProps } from '$/components/button';
import { Heading } from '$/components/heading';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { useNotificationContext } from '$/contexts/notification-context';

import { SignInButton } from '../sign-in-button';

export interface IMainButtonProps {
  disabled?: boolean;
  isReply?: boolean;
  onClickDismiss?: () => void;
  isLoading: boolean;
  onClickSubmit: () => void;
}

export function MainButton({
  isReply,
  isLoading,
  onClickDismiss,
  onClickSubmit,
  disabled,
}: IMainButtonProps): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const { registerNotification, didRegister } = useNotificationContext();
  const handleClickSubmit = async () => {
    await registerNotification();
    onClickSubmit();
  };
  const postButtonProps: Partial<ButtonProps> = {
    size: 'sm',
    variant: 'solid',
    color: 'primary',
    disabled: isLoading || disabled,
    'aria-label': isLoading ? 'Posting' : 'Post',
  };
  const buttonChildren = (
    <>
      {isLoading ? <Loader tw="animate-spin w-5 h-5" /> : <Send size="14" />}
      <span>Post</span>
    </>
  );
  return (
    <div tw="flex flex-row justify-end space-x-2">
      {isReply && (
        <Button variant="text" size="sm" onClick={onClickDismiss}>
          Cancel
        </Button>
      )}
      {isSignIn ? (
        didRegister ? (
          <Button {...postButtonProps} onClick={onClickSubmit}>
            {buttonChildren}
          </Button>
        ) : (
          <Popover
            placement="topEnd"
            content={
              <section tw="w-64">
                <Heading as="h5" tw="font-bold">
                  Get notification for replies
                </Heading>
                <Text size="sm" tw="mt-2" variant="secondary">
                  Get a push notification if there is a reply to your comment
                </Text>
                <div tw="mt-5 space-x-2">
                  <Button size="sm" color="gray" onClick={onClickSubmit}>
                    No, thanks
                  </Button>
                  <Button size="sm" variant="solid" color="primary" onClick={handleClickSubmit}>
                    Sure
                  </Button>
                </div>
              </section>
            }
            buttonProps={{ ...postButtonProps, css: tw`py-[7px]` }}
          >
            {buttonChildren}
          </Popover>
        )
      ) : (
        <SignInButton size="sm" />
      )}
    </div>
  );
}

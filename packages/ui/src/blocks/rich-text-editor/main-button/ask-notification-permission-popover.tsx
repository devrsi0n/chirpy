import * as React from 'react';

import {
  Button,
  Heading,
  IPopoverButtonProps,
  Popover,
  Text,
} from '../../../components';

export interface IAskNotificationPermissionPopoverProps {
  onClickAskNextTime: () => void;
  onClickSure: () => void;
  onClickDontAskAgain: () => void;
  buttonProps: Omit<IPopoverButtonProps, 'children'>;
  children: React.ReactNode;
}

export function AskNotificationPermissionPopover({
  onClickAskNextTime,
  onClickSure,
  onClickDontAskAgain,
  buttonProps,
  children,
}: IAskNotificationPermissionPopoverProps): JSX.Element {
  return (
    <Popover>
      <Popover.Button {...buttonProps} className="!py-2">
        {children}
      </Popover.Button>
      <Popover.Panel autoClose={false} placement="topEnd">
        <section className="w-[310px]">
          <Heading as="h5" className="font-bold">
            Get notification for replies
          </Heading>
          <Text size="sm" className="mt-2" variant="secondary">
            Get a push notification if there is a reply to your comment
          </Text>
          <div className="mt-5 flex items-center justify-end space-x-2">
            <div className="mr-auto">
              <Button
                size="xs"
                variant="text"
                color="gray"
                onClick={onClickDontAskAgain}
              >
                {"Don't ask again"}
              </Button>
            </div>
            <Button size="sm" color="gray" onClick={onClickAskNextTime}>
              Ask next time
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="primary"
              onClick={onClickSure}
            >
              Sure
            </Button>
          </div>
        </section>
      </Popover.Panel>
    </Popover>
  );
}

import * as React from 'react';

import {
  Button,
  Heading,
  IconPlusCircle,
  Popover,
  Text,
} from '../../components';
import { useCurrentUser } from '../../contexts';

export type CreateProjectButtonProps = {
  projectCount?: number;
  onCreateProject: () => void;
};

export function CreateProjectButton(
  props: CreateProjectButtonProps,
): JSX.Element {
  const { data } = useCurrentUser();
  let disabledType: DisabledType | undefined;
  if (!data.email) {
    disabledType = 'anonymous';
  } else if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
    disabledType = 'maintenanceMode';
  }
  const createButtonProps = {
    variant: 'solid',
    color: 'primary',
    className: 'space-x-1',
  } as const;
  const createButtonChildren = (
    <>
      <IconPlusCircle size={18} />
      <span>Create project</span>
    </>
  );
  return (
    <>
      {disabledType ? (
        <Popover>
          <Popover.Button {...createButtonProps}>
            {createButtonChildren}
          </Popover.Button>
          <Popover.Panel type="alert" placement="bottomEnd">
            {DISABLED_MESSAGE_MAP[disabledType]}
          </Popover.Panel>
        </Popover>
      ) : (
        <Button onClick={props.onCreateProject} {...createButtonProps}>
          {createButtonChildren}
        </Button>
      )}
    </>
  );
}

type DisabledType = 'anonymous' | 'maintenanceMode';
const DISABLED_MESSAGE_MAP: Record<DisabledType, JSX.Element> = {
  anonymous: (
    <section className="w-[24rem]">
      <Heading as="h5" className="font-bold">
        Connect an email with your account
      </Heading>
      <Text className="mt-2" variant="secondary">
        Otherwise, you may lose access to your project after creation. You can
        re-sign in with your email or social media account.
      </Text>
    </section>
  ),
  maintenanceMode: (
    <section className="w-[24rem]">
      <Heading as="h5" className="font-bold">
        System maintenance mode
      </Heading>
      <Text className="mt-2" variant="secondary">
        All editing actions are disabled during this period, Please check back
        in a little while and try again.
      </Text>
    </section>
  ),
};

import { isENVProd } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  Heading,
  IconBook,
  IconMessageSquare,
  IconPlusCircle,
  Menu,
  Popover,
  Text,
} from '../../../components';
import { useCurrentUser } from '../../../contexts';

export type CreateProjectButtonProps = {
  projectCount?: number;
  onClickCreateProject: () => void;
};

export function CreateProjectButton(
  props: CreateProjectButtonProps,
): JSX.Element {
  const { data } = useCurrentUser();
  // let disabledType: DisabledType | undefined = 'maintenanceMode';
  let disabledType: DisabledType | undefined;
  if (isENVProd && (props.projectCount || 0) > 0) {
    disabledType = 'projectLimit';
  } else if (!data.email) {
    disabledType = 'anonymous';
  } else if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
    disabledType = 'maintenanceMode';
  }
  const createButtonProps = {
    variant: 'solid',
    color: 'primary',
  } as const;
  const createButtonChildren = (
    <>
      <IconPlusCircle size={18} />
      <span className="ml-1 inline-block">Create</span>
    </>
  );
  const router = useRouter();
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
        <Menu>
          <Menu.Button shape="square" {...createButtonProps}>
            {createButtonChildren}
          </Menu.Button>
          <Menu.Items>
            <Menu.Item
              align="start"
              onClick={() => router.push('/site/create')}
            >
              <IconBook size={16} />
              <span className="ml-1">Blog site</span>
            </Menu.Item>
            <Menu.Item align="start" onClick={props.onClickCreateProject}>
              <IconMessageSquare size={16} />
              <p className="ml-1 whitespace-nowrap">Comment project</p>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </>
  );
}

type DisabledType = 'anonymous' | 'projectLimit' | 'maintenanceMode';
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
  projectLimit: (
    <section className="w-[24rem]">
      <Heading as="h5" className="font-bold">
        Reached the maximum number of projects
      </Heading>
      <Text className="mt-2" variant="secondary">
        You can delete an existing project to create a new one.
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

import { getPlanPrice } from '@chirpy-dev/trpc/src/services/payment/plan';
import * as React from 'react';

import {
  Button,
  Heading,
  IconPlusCircle,
  Link,
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
  const plan = getPlanPrice(data.plan || 'HOBBY');
  let disabledType: DisabledType | undefined;
  if ((props.projectCount || 0) >= plan.maxProjectNum) {
    disabledType = 'projectLimit';
  } else if (!data.email) {
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
          <Popover.Panel type="alert" placement="top">
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
    <section className="w-[18rem]">
      <Heading as="h5" className="font-bold">
        Maximum projects reached
      </Heading>
      <p className="mt-2 space-x-1 text-gray-1100">
        <span>Upgrade your plan to create more projects,</span>
        <Link href="/dashboard/billings">Upgrade</Link>
      </p>
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

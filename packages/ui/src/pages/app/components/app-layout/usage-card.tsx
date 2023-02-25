import { useRouter } from 'next/router';
import * as React from 'react';

import {
  Button,
  Heading,
  IconButton,
  IconX,
  ProgressBar,
  Text,
} from '../../../../components';
import { trpcClient } from '../../../../utilities';

const USAGE_THRESHOLD = 80;

export function UsageCard(): JSX.Element {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = React.useState(false);
  const { data } = trpcClient.analytics.usage.useQuery();

  const handleClickDissmiss = () => {
    setIsDismissed(true);
  };
  if (isDismissed || !data) {
    return <></>;
  }
  const usagePercentage = Math.round((data.usage / data.usageLimit) * 100);

  if (usagePercentage < USAGE_THRESHOLD) {
    return <></>;
  }

  return (
    <div className="relative rounded-lg bg-gray-200 px-4 py-5">
      <Heading as="h6" className="mb-1 text-sm font-semibold">
        Used pageviews
      </Heading>
      <Text variant="secondary" className="mb-4">
        Your team has used {usagePercentage}% of your available pageviews. Need
        more?
      </Text>
      <ProgressBar value={usagePercentage} className="mb-4" />
      <div className="flex flex-row space-x-3">
        <Button
          variant="text"
          size="sm"
          className="!p-0"
          onClick={handleClickDissmiss}
        >
          Dismiss
        </Button>
        <Button
          variant="text"
          color="primary"
          size="sm"
          className="!p-0"
          onClick={() => router.push('/billing')}
        >
          Upgrade plan
        </Button>
      </div>
      <IconButton
        className="!absolute right-4 top-5"
        onClick={handleClickDissmiss}
      >
        <IconX size={24} />
      </IconButton>
    </div>
  );
}

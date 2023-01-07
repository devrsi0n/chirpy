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
import { useLocalStorage } from '../../../../hooks';

export function UsageCard(): JSX.Element {
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useLocalStorage(
    false,
    'usage-card-dismissed',
  );
  const handleClickDissmiss = () => {
    setIsDismissed(true);
  };
  if (isDismissed) {
    return <></>;
  }
  return (
    <div className="relative bg-gray-300 px-4 py-5">
      <Heading as="h6" className="mb-1 text-sm font-semibold">
        Used pageviews
      </Heading>
      <Text variant="secondary" className="mb-4">
        Your team has used 80% of your available pageviews. Need more?
      </Text>
      <ProgressBar value={80} className="mb-4" />
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

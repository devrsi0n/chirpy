import clsx from 'clsx';
import * as React from 'react';

import { Card, Link, IconPlus, Text } from '../../components';
import { cardStyle } from './site-card';

export function EmptySiteCard(): JSX.Element {
  return (
    <Card
      as={Link}
      href={`/site/create`}
      variant="plain"
      className={clsx(
        'flex flex-col items-center justify-center border-2 border-dashed !border-primary-600 shadow-primary-400 hover:shadow-primary-400',
        cardStyle,
      )}
    >
      <div className="mb-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-8 border-primary-300 bg-primary-500 text-primary-900">
        <IconPlus />
      </div>
      <Text className="mb-1 font-semibold text-primary-900">
        Create new site
      </Text>
      <Text size="sm">Connect your Notion database and go live</Text>
    </Card>
  );
}

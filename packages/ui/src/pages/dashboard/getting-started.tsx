import clsx from 'clsx';
import * as React from 'react';

import { SiteLayout } from '../../blocks';
import {
  GettingStartedBody,
  GettingStarttedTitle,
} from '../../blocks/integrate-guide/getting-started';

export type GettingStartedProps = {
  domain: string;
};

export function GettingStarted(props: GettingStartedProps): JSX.Element {
  return (
    <SiteLayout title="Getting Started">
      <div className="flex flex-col gap-6">
        <GettingStarttedTitle />
        <GettingStartedBody domain={props.domain} />
      </div>
    </SiteLayout>
  );
}

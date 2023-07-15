import * as React from 'react';

import { SiteLayout } from '../../../blocks';
import {
  GetStartedBody,
  GetStarttedTitle,
} from '../../../blocks/integrate-guide/get-started';

export type GetStartedProps = {
  domain: string;
};

export function GetStarted(props: GetStartedProps): JSX.Element {
  return (
    <SiteLayout title="Get Started">
      <div className="flex flex-col gap-6">
        <GetStarttedTitle />
        <GetStartedBody domain={props.domain} />
      </div>
    </SiteLayout>
  );
}

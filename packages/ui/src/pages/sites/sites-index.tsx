import * as React from 'react';

import { Heading } from '../../components';

export type SitesIndexProps = {
  subdomain: string;
};

export function SitesIndex(props: SitesIndexProps): JSX.Element {
  return (
    <div>
      <Heading>Site {props.subdomain}</Heading>
      <Heading as="h3">Post list</Heading>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

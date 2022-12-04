import Link from 'next/link';
import * as React from 'react';

import { Banner } from './banner';

export function MaintenanceBanner(): JSX.Element {
  if (!process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
    return <></>;
  }
  return <MaintenanceBannerInner />;
}

function MaintenanceBannerInner(): JSX.Element {
  return (
    <Banner title="System maintenance">
      {`Check out `}
      <Link target="_blank" href="/docs/system-maintenance">
        details
      </Link>
    </Banner>
  );
}

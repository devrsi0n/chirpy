import { isENVProd } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { trpcClient } from '../../../utilities';

export type SitesLayoutProps = {
  children: React.ReactNode;
};

export function SitesLayout(props: SitesLayoutProps): JSX.Element {
  useCalcPV();
  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
      {props.children}
    </div>
  );
}

async function useCalcPV() {
  const { mutateAsync: increasePV } = trpcClient.site.increasePV.useMutation();
  const router = useRouter();
  React.useEffect(() => {
    if (!isENVProd) {
      return;
    }
    function handlePageLoaded() {
      increasePV({
        host: location.host,
      });
    }
    router.events.on('routeChangeComplete', handlePageLoaded);
    handlePageLoaded();
    return () => {
      router.events.off('routeChangeComplete', handlePageLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

import * as React from 'react';
import { trpcClient } from '../../utilities';
import { useRouter } from 'next/router';
import { isENVProd } from '@chirpy-dev/utils';

export type SitesLayoutProps = {
  children: React.ReactNode;
};

export function SitesLayout(props: SitesLayoutProps): JSX.Element {
  useCalcPV();
  return <div>{props.children}</div>;
}

async function useCalcPV() {
  const { mutateAsync: increasePV } = trpcClient.site.increasePV.useMutation();
  const router = useRouter();
  React.useEffect(() => {
    if (!isENVProd){
      return;
    }
    function handlePageLoaded() {
      increasePV({
        hostname: location.hostname,
      });
    }
    router.events.on('routeChangeComplete', handlePageLoaded);
    handlePageLoaded();
    return () => {
      router.events.off('routeChangeComplete', handlePageLoaded);
    };
  }, []);
}

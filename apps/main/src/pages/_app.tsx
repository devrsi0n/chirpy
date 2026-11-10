import '@chirpy-dev/ui/src/styles/globals.scss';

import { App } from '@chirpy-dev/ui';
import type { AppProps } from 'next/app';
import type { ComponentType } from 'react';

import { deserializePageProps } from '$/utilities/page-props';

const TypedApp = App as ComponentType<AppProps>;

export default function ChirpyApp(props: AppProps) {
  return (
    <TypedApp {...props} pageProps={deserializePageProps(props.pageProps)} />
  );
}

export { reportWebVitals } from '@chirpy-dev/ui';

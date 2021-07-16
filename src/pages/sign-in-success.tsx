import CheckInCircle from '@geist-ui/react-icons/checkInCircle';
import Loader from '@geist-ui/react-icons/loader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { Layout } from '$/components/Layout';
import { Text } from '$/components/Text';
import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

function LogInSuccess(): JSX.Element {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      window.postMessage(
        {
          key: LOG_IN_SUCCESS_KEY,
          value: location.pathname,
        },
        '*',
      );
      if (window.localStorage.getItem(LOG_IN_SUCCESS_KEY)?.length) {
        window.localStorage.setItem(LOG_IN_SUCCESS_KEY, '');
      }
      window.localStorage.setItem(LOG_IN_SUCCESS_KEY, location.pathname);
    }, 3000);
    setTimeout(() => {
      router.push('/');
    }, 6000);
  }, [router]);
  return (
    <Layout noContainer>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main tw="py-12 flex flex-col items-center space-y-6">
        <Loader tw="animate-spin text-gray-400 w-10 h-10" />
        <div tw="flex flex-row items-center space-x-2">
          <div tw="text-green-500">
            <CheckInCircle />
          </div>
          <Text tw="text-lg text-center ">Sign in success, redirecting to the original page.</Text>
        </div>
      </main>
    </Layout>
  );
}

export default LogInSuccess;

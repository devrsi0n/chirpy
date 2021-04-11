import CheckInCircle from '@geist-ui/react-icons/checkInCircle';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import 'twin.macro';

import { SpinnerIcon } from '$/components/Icons';
import { Layout } from '$/components/Layout';
import { Text } from '$/components/Text';
import { LOG_IN_SUCCESS_KEY } from '$/lib/constants';

function LogInSuccess(): JSX.Element {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      if (window.localStorage.getItem(LOG_IN_SUCCESS_KEY) === 'true') {
        window.localStorage.setItem(LOG_IN_SUCCESS_KEY, '');
      }
      window.localStorage.setItem(LOG_IN_SUCCESS_KEY, 'true');
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
        <SpinnerIcon tw="text-gray-400 w-10 h-10" />
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

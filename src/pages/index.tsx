import * as React from 'react';
import Head from 'next/head';

import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text/Text';
import { Layout } from '$/components/Layout';
import { BaseButton } from '$/components/Button/BaseButton';
import { Button } from '$/components/Button';

function Home(): JSX.Element {
  return (
    <Layout>
      <div className="space-y-4">
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Heading as="h1" className="flex flex-col text-center">
          <span
            className="font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-blue-600"
            style={{ lineHeight: 1.2, fontSize: '6rem' }}
          >
            Express.
          </span>
          <span
            className="font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-indigo-600"
            style={{ lineHeight: 1.185, fontSize: '5.5rem' }}
          >
            Engage.
          </span>
          <span
            className="font-black leading-tight text-transparent bg-clip-text bg-gradient-to-br from-yellow-500 to-pink-600 mt-1"
            style={{ lineHeight: 1.09, fontSize: '4.4rem' }}
          >
            Monetize.
          </span>
        </Heading>
        <div className="flex justify-center items-center space-x-6">
          <Button className="bg-black">Try It Free</Button>
          <BaseButton>Learn More</BaseButton>
        </div>
        <Text className="text-gray-500">
          Access your audience quickly by integrating a modern comment system.
        </Text>
      </div>
    </Layout>
  );
}

export default Home;

import * as React from 'react';
import Head from 'next/head';

import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text/Text';
import { Layout } from '$/components/Layout';
import { BaseButton } from '$/components/Button/BaseButton';
import { Button } from '$/components/Button';

function Home(): JSX.Element {
  return (
    <Layout disableContainer>
      <main className="py-12 space-y-8">
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Heading
          as="h1"
          className="font-black text-center"
          style={{ lineHeight: 1.09, fontSize: '4.0rem' }}
        >
          <span>Comment system made </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 mt-1">
            easy.
          </span>
        </Heading>
        <Text className="text-gray-500 text-center">
          Access your audience quickly by integrating a modern comment system.
        </Text>
        <div className="flex justify-center items-center space-x-6">
          <Button variant="solid" color="purple">
            Try It Free
          </Button>
          <Button variant="plain">Learn More</Button>
        </div>
      </main>
    </Layout>
  );
}

export default Home;

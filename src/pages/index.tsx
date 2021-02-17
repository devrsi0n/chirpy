import * as React from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import ArrowRight from '@geist-ui/react-icons/arrowRight';

import { Text } from '$/components/Text/Text';
import { Layout } from '$/components/Layout';
import { Button } from '$/components/Button';

import styles from '$/styles/home.module.scss';

function Home(): JSX.Element {
  return (
    <Layout disableContainer>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main className="py-12 space-y-8">
        <h1
          className={clsx(
            'font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mt-1',
            styles.headline,
          )}
        >
          Comment system made easy.
        </h1>
        <Text className="text-gray-500 text-center dark:text-gray-400">
          Access your audience quickly by integrating a modern comment system.
        </Text>
        <div className="flex justify-center items-center space-x-6">
          <Button
            variant="solid"
            color="purple"
            className="space-x-1 transition-shadow hover:shadow-2xl"
          >
            <span>Try It Free</span>
            <ArrowRight size="20px" />
          </Button>
          <Button variant="plain">Learn More</Button>
        </div>
      </main>
    </Layout>
  );
}

export default Home;

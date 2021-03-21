import ArrowRight from '@geist-ui/react-icons/arrowRight';
import Head from 'next/head';
import * as React from 'react';
import { css } from 'twin.macro';

import { Button } from '$/components/Button';
import { Layout } from '$/components/Layout';
import { Text } from '$/components/Text/Text';

function Home(): JSX.Element {
  return (
    <Layout disableContainer>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <main tw="py-12 space-y-8">
        <h1
          tw="font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mt-1"
          css={css`
            line-height: 1.09;
            font-size: 3.25rem;
            width: 100%;

            @media (min-width: 320px) {
              & {
                line-height: 1.09;
                font-size: 4rem;
              }
            }

            @media (min-width: 640px) {
              & {
                width: 35rem;
              }
            }
          `}
        >
          Comment system made easy.
        </h1>
        <Text tw="text-gray-500 text-center dark:text-gray-400">
          Access your audience quickly by integrating a modern comment system.
        </Text>
        <div tw="flex justify-center items-center space-x-6">
          <Button
            variant="solid"
            color="purple"
            className="group"
            tw="space-x-1 transition hover:shadow-2xl"
          >
            <span>Try It Free</span>
            <ArrowRight
              size="20px"
              tw="inline-block transition transform group-hover:translate-x-1"
            />
          </Button>
          <Button variant="plain">Learn More</Button>
        </div>
      </main>
    </Layout>
  );
}

export default Home;

import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';
import { Layout } from '$/components/Layout';
import { ssrMode } from '$/utilities/env';

function DeletionConfirmation(): JSX.Element {
  return (
    <Layout noContainer>
      <Head>
        <title>Deletion confirmation</title>
      </Head>
      <main tw="py-12 space-y-8">
        <Heading as="h1">
          Thanks, you facebook account was already deleted. Status code{' '}
          {!ssrMode ? new URLSearchParams(location.search).get('code') : ''}
        </Heading>
      </main>
    </Layout>
  );
}

export default DeletionConfirmation;

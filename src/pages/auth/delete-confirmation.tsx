import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';
import { APP_NAME } from '$/lib/constants';
import { ssrMode } from '$/utilities/env';

function DeleteConfirmation(): JSX.Element {
  return (
    <>
      <Head>
        <title>Delete confirmation - {APP_NAME}</title>
      </Head>
      <div tw="space-y-8">
        <Heading as="h1">
          Thanks, your facebook account was deleted. Status code{' '}
          {!ssrMode ? new URLSearchParams(location.search).get('code') : ''}
        </Heading>
      </div>
    </>
  );
}

export default DeleteConfirmation;

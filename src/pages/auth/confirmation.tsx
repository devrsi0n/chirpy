import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { ConfirmUserFields } from '$/blocks/ConfirmUserFields';
import { Heading } from '$/components/Heading';

// export type confirmationProps = React.PropsWithChildren<{}>;

export default function Confirmation(/*props: confirmationProps*/): JSX.Element {
  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>

      <section tw="flex flex-row items-center justify-center space-x-8">
        <div tw="space-y-3">
          <Heading as="h2" tw="tracking-tight">
            Just fill this form to get started
          </Heading>
        </div>
        <ConfirmUserFields />
      </section>
    </>
  );
}

Confirmation.auth = true;

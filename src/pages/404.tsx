import AlertCircleFill from '@geist-ui/react-icons/alertCircleFill';
import Head from 'next/head';
import * as React from 'react';
import tw, { css } from 'twin.macro';

import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Text } from '$/components/Text/Text';
import { APP_NAME } from '$/lib/constants';

export default function Custom404(): JSX.Element {
  return (
    <>
      <Head>
        <title>404 - {APP_NAME}</title>
      </Head>
      <section tw="px-4 space-y-8 flex flex-col items-center">
        <div
          css={[
            tw`flex justify-center text-gray-1000`,
            css`
              --geist-icons-background: white;
            `,
          ]}
        >
          <div css={[dashedBorder, tw`p-6 border-opacity-30`]}>
            <div css={[dashedBorder, tw`p-5 border-opacity-50`]}>
              <div css={[dashedBorder, tw`p-4 border-opacity-80`]}>
                <div css={[dashedBorder, tw`p-3`]}>
                  <AlertCircleFill size={84} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Heading tw="font-bold">Oops! Page not found</Heading>
        <Text variant="secondary">We might have encountered some issues...</Text>
        <section tw="space-y-3">
          <Heading as="h5">What could have caused this?</Heading>
          <List variant="unordered" tw="space-y-3">
            <List.Item styles={{ marker: listMakerStyle }}>
              Something went wrong in our services.
            </List.Item>
            <List.Item styles={{ marker: listMakerStyle }}>The page might be removed.</List.Item>
            <List.Item styles={{ marker: listMakerStyle }}>
              You might typed the wrong URL.
            </List.Item>
          </List>
        </section>
        <div tw="flex justify-center items-center space-x-6">
          <Link href="/" variant="plain">
            <Button
              variant="solid"
              color="primary"
              className="group"
              tw="space-x-1 transition hover:shadow-2xl"
            >
              <span>Back to homepage</span>
            </Button>
          </Link>
          <Button>Learn More</Button>
        </div>
      </section>
    </>
  );
}

const dashedBorder = tw`rounded-full border border-dashed`;
const listMakerStyle = tw`bg-red-900`;

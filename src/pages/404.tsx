import AlertCircleFill from '@geist-ui/react-icons/alertCircleFill';
import clsx from 'clsx';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { List } from '$/components/list';
import { Text } from '$/components/text/text';

export default function Custom404(): JSX.Element {
  return (
    <SiteLayout title="404">
      <section className="px-4 space-y-8 flex flex-col items-center">
        <div
          className={`flex justify-center text-gray-1000`}
          style={
            {
              '--geist-icons-background': 'white',
            } as React.CSSProperties
          }
        >
          <div className={clsx(dashedBorder, `p-6 border-opacity-30`)}>
            <div className={clsx(dashedBorder, `p-5 border-opacity-50`)}>
              <div className={clsx(dashedBorder, `p-4 border-opacity-80`)}>
                <div className={clsx(dashedBorder, `p-3`)}>
                  <AlertCircleFill size={84} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Heading className="font-bold">Oops! Page not found</Heading>
        <Text variant="secondary">We might have encountered some issues...</Text>
        <section className="space-y-3">
          <Heading as="h5">What could have caused this?</Heading>
          <List variant="unordered" className="space-y-3">
            <List.Item styles={{ marker: listMakerStyle }}>
              Something went wrong in our services.
            </List.Item>
            <List.Item styles={{ marker: listMakerStyle }}>The page might be removed.</List.Item>
            <List.Item styles={{ marker: listMakerStyle }}>
              You might typed the wrong URL.
            </List.Item>
          </List>
        </section>
        <div className="flex justify-center items-center space-x-6">
          <Link href="/" variant="plain">
            <Button
              variant="solid"
              color="primary"
              className="group space-x-1 transition hover:shadow-2xl"
            >
              <span>Back to homepage</span>
            </Button>
          </Link>
          <Button>Learn More</Button>
        </div>
      </section>
    </SiteLayout>
  );
}

const dashedBorder = `rounded-full border border-dashed`;
const listMakerStyle = `bg-red-900`;

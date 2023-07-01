import { getAppURL } from '@chirpy-dev/utils';
import * as React from 'react';

import { Code } from '../../components/code';
import { Heading } from '../../components/heading';
import { Text } from '../../components/text';

export function GettingStarttedTitle(): React.ReactNode {
  return (
    <div>
      <Heading as="h2" className="mb-3 font-bold !leading-none">
        Getting Started
      </Heading>
      <Text variant="secondary" className="font-normal">
        Integrate the widget into your website to start engaging with your
        users.
      </Text>
    </div>
  );
}

export function GettingStartedBody({ domain }: { domain: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading as="h3">Usage on any website</Heading>
      <div className="flex flex-col gap-2">
        <Text variant="secondary">
          {`Chirpy is not just your average comment system - it's a feature-packed tool with powerful `}
          <strong>built-in analytics</strong>
          {`. With Chirpy, you can seamlessly integrate the analytics service and save time and effort.`}
        </Text>
        <Text variant="secondary">
          {`Getting started is a breeze. Simply follow these user-friendly steps:`}
        </Text>
      </div>
      <ol className="flex list-outside list-decimal flex-col gap-3 ps-4">
        <li>
          <div>
            <Text variant="secondary">
              {`Copy the script provided below and paste it into the body of your HTML, make sure it will be loaded on every page.`}
            </Text>
            <Code>
              {`<script defer src="${getAppURL()}/bootstrapper.js" data-chirpy-domain="${domain}"></script>`}
            </Code>
          </div>
        </li>
        <li>
          <div>
            <Text variant="secondary">
              {`Then, add the data-chirpy-comment attribute to any page that should render the comment widget:`}
            </Text>
            <Code>{`<div data-chirpy-comment="true" id="chirpy-comment"></div>`}</Code>
          </div>
        </li>
        <li>
          <Text variant="secondary">
            {`🎉 Congratulations! The comment widget is ready to go.`}
          </Text>
        </li>
      </ol>
    </div>
  );
}

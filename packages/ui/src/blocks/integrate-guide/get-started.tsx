import { getAppURL } from '@chirpy-dev/utils';
import * as React from 'react';

import { Code } from '../../components/code';
import { Heading } from '../../components/heading';
import { Text } from '../../components/text';

export function GetStarttedTitle(): React.ReactNode {
  return (
    <div>
      <Heading as="h2" className="mb-3 font-bold !leading-none">
        Get Started
      </Heading>
      <Text variant="secondary" className="font-normal">
        Integrate the widget into your website to start engaging with your
        users.
      </Text>
    </div>
  );
}

export function GetStartedBody({ domain }: { domain: string }) {
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
          {`Getting started is a breeze. Simply follow these steps:`}
        </Text>
      </div>
      <ol className="flex list-outside list-decimal flex-col gap-6 ps-4">
        <li>
          <div className="space-y-2">
            <Text variant="secondary">
              {`Copy the script provided below and paste it into the body of your HTML, make sure it will be loaded on every page.`}
            </Text>
            <Code language="html">
              {`<script defer src="${getAppURL()}/bootstrapper.js" data-chirpy-domain="${domain}"></script>`}
            </Code>
          </div>
        </li>
        <li>
          <div className="space-y-2">
            <Text variant="secondary">
              {`Then, paste this html element to any page that should render the comment widget:`}
            </Text>
            <Code language="html">{`<!--
  The widget follows "system" settings for light/dark mode
  by default, but you can manually select "light" or "dark"
  mode for a consistent display
-->
<div
  data-chirpy-theme="system"
  data-chirpy-comment="true"
  id="chirpy-comment"
></div>`}</Code>
          </div>
        </li>
        <li>
          <Text variant="secondary">
            {`🎉 Congratulations! The comment widget is ready to go live.`}
          </Text>
        </li>
      </ol>
    </div>
  );
}

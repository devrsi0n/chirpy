import { getAppURL } from '@chirpy-dev/utils';
import * as React from 'react';

import { Button } from '../../components/button';
import { Code } from '../../components/code';
import { Dialog } from '../../components/dialog';
import { Heading } from '../../components/heading';
import { Text } from '../../components/text';

export type IntegrateGuideProps = {
  domain: string;
};

export function IntegrateGuide({ domain }: IntegrateGuideProps): JSX.Element {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <div>
      <Button
        className="px-2 py-1"
        shadow={false}
        onClick={() => setShowDialog(true)}
        aria-label="Integrate guide"
      >
        Integrate
      </Button>
      <Dialog
        showDismissButton
        show={showDialog}
        title={
          <div>
            <Heading as="h2" className="mb-3 !leading-none">
              Get Started with Chirpy Comment & Analytics
            </Heading>
            <Text variant="secondary" className="font-normal">
              Integrate the widget into your website to start engaging with your
              users.
            </Text>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: `!max-w-2xl sm:!px-14 sm:!py-10` }}
      >
        <Dialog.Body>
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
                    {`Then, add the data-chirpy-comment attribute to any page that should render the widget:`}
                  </Text>
                  <Code>{`<div data-chirpy-comment="true"></div>`}</Code>
                </div>
              </li>
              <li>
                <Text variant="secondary">
                  {`🎉 Congratulations! The comment widge is ready to go.`}
                </Text>
              </li>
            </ol>
          </div>
        </Dialog.Body>
      </Dialog>
    </div>
  );
}

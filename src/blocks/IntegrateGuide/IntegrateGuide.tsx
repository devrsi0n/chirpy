import * as React from 'react';
import tw from 'twin.macro';

import { Button } from '$/components/Button';
import { Code } from '$/components/Code';
import { Dialog } from '$/components/Dialog';
import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';
import { APP_URL, APP_NAME } from '$/lib/constants';

export type IntegrateGuideProps = {
  domain: string;
};

export function IntegrateGuide({ domain }: IntegrateGuideProps): JSX.Element {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <div>
      <Button
        tw="px-2 py-1"
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
            <Heading as="h2" tw="mb-3 leading-none">
              Get Started with {APP_NAME} Comment
            </Heading>
            <Text as="p" size="lg" variant="secondary">
              Integrate the widget into your website to start engaging with your customer.
            </Text>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: tw`max-w-2xl sm:(px-14 py-10)` }}
      >
        <div tw="">
          <Heading as="h3" tw="mb-3">
            Usage on any website
          </Heading>
          <div tw="space-y-2">
            <Text variant="secondary">
              To embed the comment widget on your website, first add the script tag with your
              project id to the HTML:
            </Text>
            <Code>
              {`<script defer src="${APP_URL}/bootstrap/comment.js" data-chirpy-domain="${domain}"></script>`}
            </Code>
            <Text variant="secondary">
              Then, add the data-chirpy-comment attribute to any HTML element that should render the
              widget:
            </Text>
            <Code>{`<div data-chirpy-comment="true">...</div>`}</Code>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

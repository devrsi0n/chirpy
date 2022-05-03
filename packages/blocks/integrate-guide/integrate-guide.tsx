import * as React from 'react';

import { Button } from '@chirpy/components';
import { Code } from '@chirpy/components';
import { Dialog } from '@chirpy/components';
import { Heading } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { APP_URL } from '@chirpy/utilities';

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
              Get Started with Chirpy Comment
            </Heading>
            <Text as="p" size="lg" variant="secondary">
              Integrate the widget into your website to start engaging with your customer.
            </Text>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: `!max-w-2xl sm:!px-14 sm:!py-10` }}
      >
        <div className="">
          <Heading as="h3" className="mb-3">
            Usage on any website
          </Heading>
          <div className="space-y-2">
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
            <Code>{`<div data-chirpy-comment="true"></div>`}</Code>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

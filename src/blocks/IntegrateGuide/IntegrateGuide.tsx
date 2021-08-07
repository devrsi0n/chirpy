import * as React from 'react';
import tw from 'twin.macro';

import { Button } from '$/components/Button';
import { Code } from '$/components/Code';
import { Dialog } from '$/components/Dialog';
import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';

export type IntegrateGuideProps = {
  pid: string;
};

const appNameLowerCase = process.env.NEXT_PUBLIC_APP_NAME.toLowerCase();

export function IntegrateGuide({ pid }: IntegrateGuideProps): JSX.Element {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <div>
      <Button
        tw=""
        shadow={false}
        size="sm"
        onClick={() => setShowDialog(true)}
        aria-label="Integrate guide"
      >
        Integrate
      </Button>
      <Dialog
        show={showDialog}
        title={
          <div>
            <Heading as="h2" tw="mb-3">
              Get Started with Totalk Comment
            </Heading>
            <Text as="p" variant="lg" tw="text-gray-500">
              Integrate the widget into your website to start engaging with your customer.
            </Text>
          </div>
        }
        onClose={() => setShowDialog(false)}
        styles={{ content: tw`max-w-2xl` }}
      >
        <Heading as="h3" tw="mb-3">
          Usage on any website
        </Heading>
        <div tw="space-y-2">
          <Text>
            To embed the comment widget on your website, first add the script tag with your project
            id to the HTML:
          </Text>
          <Code>
            {`<script defer src="https://totalk.dev/bootstrap/comment.js" data-${appNameLowerCase}-pid="${pid}"><script>`}
          </Code>
          <Text>
            Then, add the data-{appNameLowerCase}-comment attribute to any HTML element that should
            render the widget:
          </Text>
          <Code>{`<div data-${appNameLowerCase}-comment>...</div>`}</Code>
        </div>
      </Dialog>
    </div>
  );
}

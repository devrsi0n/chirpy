import * as React from 'react';

import { Button } from '../../components/button';
import { Dialog } from '../../components/dialog';
import { GettingStartedBody, GettingStarttedTitle } from './getting-started';

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
        title={<GettingStarttedTitle />}
        onClose={() => setShowDialog(false)}
        styles={{ content: `!max-w-2xl sm:!px-14 sm:!py-10` }}
      >
        <Dialog.Body>
          <GettingStartedBody domain={domain} />
        </Dialog.Body>
      </Dialog>
    </div>
  );
}

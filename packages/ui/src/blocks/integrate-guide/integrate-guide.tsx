import * as React from 'react';

import { Button } from '../../components/button';
import { Dialog } from '../../components/dialog';
import { GetStartedBody, GetStarttedTitle } from './get-started';

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
        title={<GetStarttedTitle />}
        onClose={() => setShowDialog(false)}
        styles={{ content: `!max-w-2xl sm:!px-14 sm:!py-10` }}
      >
        <Dialog.Body>
          <GetStartedBody domain={domain} />
        </Dialog.Body>
      </Dialog>
    </div>
  );
}

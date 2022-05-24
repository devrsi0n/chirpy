import * as React from 'react';

import { Button, ButtonProps } from '$/components/button';
import { Dialog } from '$/components/dialog';

export interface IToxicTextDialogProps {
  buttonProps: Partial<ButtonProps>;
  onClickSubmit: () => void;
  onClickAckToxicComment: () => void;
  children: React.ReactNode;
  toxicLabels: string[] | null;
}

const DEFAULT_LABELS: string[] = [];

export function ToxicTextDialog({
  onClickSubmit,
  onClickAckToxicComment,
  buttonProps,
  children,
  toxicLabels,
}: IToxicTextDialogProps): JSX.Element {
  const _toxicLabels = toxicLabels || DEFAULT_LABELS;
  const [show, setShow] = React.useState(_toxicLabels.length > 0);
  React.useEffect(() => {
    setShow(_toxicLabels.length > 0);
  }, [_toxicLabels]);

  return (
    <>
      <Button {...buttonProps} className={`py-[7px]`} onClick={onClickSubmit}>
        {children}
      </Button>
      <Dialog
        size="sm"
        type="alert"
        show={show}
        title={'Toxic comment'}
        onClose={() => setShow(false)}
        styles={{
          overlay: 'backdrop-blur-none bg-transparent',
          panel: '!shadow-2xl border border-gray-500 rounded-lg',
        }}
      >
        <p>
          Your comment contains<strong className="px-1">{_toxicLabels.join(', ')}</strong>sentences.
          You must remove them before posting.
        </p>
        <Dialog.Footer>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            onClick={onClickAckToxicComment}
            className={'px-4'}
          >
            OK
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

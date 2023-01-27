import * as React from 'react';

import {
  Button,
  ButtonProps,
  Heading,
  Popover,
  Text,
} from '../../../components';

export interface IToxicTextPopoverProps {
  buttonProps: Partial<ButtonProps>;
  onClickSubmit: () => void;
  onClickAckToxicComment: () => void;
  children: React.ReactNode;
  toxicLabels: string[] | null;
}

const DEFAULT_LABELS: string[] = [];

export function ToxicTextPopover({
  onClickSubmit,
  onClickAckToxicComment,
  buttonProps,
  children,
  toxicLabels,
}: IToxicTextPopoverProps): JSX.Element {
  const _toxicLabels = toxicLabels || DEFAULT_LABELS;
  const [show, setShow] = React.useState(_toxicLabels.length > 0);
  React.useEffect(() => {
    setShow(_toxicLabels.length > 0);
  }, [_toxicLabels]);

  const handleClickOk = () => {
    setShow(false);
    onClickAckToxicComment();
  };

  return (
    <Popover open={show}>
      <Popover.Button
        {...buttonProps}
        className="!py-2"
        onClick={onClickSubmit}
      >
        {children}
      </Popover.Button>
      <Popover.Panel autoClose={false} placement="topEnd" type="alert">
        <section className="w-64">
          <Heading as="h5" className="font-bold">
            Toxic comment
          </Heading>
          <Text size="sm" className="mt-2" variant="secondary">
            Your comment contains
            <strong className="px-1">{_toxicLabels.join(', ')}</strong>
            sentences. You must remove them before posting.
          </Text>
          <div className="mt-5 flex justify-end">
            <Button size="sm" variant="primary" onClick={handleClickOk}>
              {`OK`}
            </Button>
          </div>
        </section>
      </Popover.Panel>
    </Popover>
  );
}

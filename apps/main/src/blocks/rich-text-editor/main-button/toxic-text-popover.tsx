import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { IPopoverProps, Popover } from '$/components/popover';
import { Text } from '$/components/text';

export interface IToxicTextPopoverProps extends Pick<IPopoverProps, 'buttonProps'> {
  onClickOK: () => void;
  children: React.ReactNode;
  toxicLabels: string[] | null;
}

export function ToxicTextPopover({
  onClickOK,
  buttonProps,
  children,
  toxicLabels,
}: IToxicTextPopoverProps): JSX.Element {
  if (!toxicLabels || toxicLabels.length === 0) {
    return (
      <Button {...buttonProps} onClick={onClickOK}>
        {children}
      </Button>
    );
  }
  return (
    <Popover
      placement="topEnd"
      content={
        <section className="w-64">
          <Heading as="h5" className="font-bold">
            Toxic comment
          </Heading>
          <Text size="sm" className="mt-2" variant="secondary">
            Your comment contains <strong>{toxicLabels.join(' ')}</strong> words. You must remove
            them before posting.
          </Text>
          <div className="mt-5 space-x-2">
            <Button size="sm" variant="solid" color="primary" onClick={onClickOK}>
              OK
            </Button>
          </div>
        </section>
      }
      buttonProps={{ ...buttonProps, className: `py-[7px]` }}
    >
      {children}
    </Popover>
  );
}

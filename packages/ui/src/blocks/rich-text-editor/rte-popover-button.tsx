import * as React from 'react';

import { Button, Popover, FormField, Input } from '../../components';
import { BaseMarkButton } from './format-buttons';

export type RTEPopoverButtonProps = {
  label: string;
  onClickGo: (inputValue: string) => void;
  children: React.ReactNode;
};

export function RTEPopoverButton({
  label,
  onClickGo,
  children,
}: RTEPopoverButtonProps): JSX.Element {
  const [value, setValue] = React.useState('');
  return (
    <Popover>
      <Popover.Button as={BaseMarkButton}>{children}</Popover.Button>
      <Popover.Panel
        autoClose={false}
        styles={{
          panel: 'flex flex-row items-end w-72',
        }}
      >
        <FormField label={label}>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </FormField>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            onClickGo(value);
            setValue('');
          }}
          className="mb-1.5"
        >
          Go
        </Button>
      </Popover.Panel>
    </Popover>
  );
}

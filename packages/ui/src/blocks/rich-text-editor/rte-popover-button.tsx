import * as React from 'react';

import { Button } from '../../components/button';
import { Popover } from '../../components/popover';
import { TextField } from '../../components/text-field';
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
        <TextField
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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

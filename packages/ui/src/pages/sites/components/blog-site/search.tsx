import { isSSRMode } from '@chirpy-dev/utils';
import { Command } from 'cmdk';
import * as React from 'react';

import { BaseButton, IconSearch } from '../../../../components';
import { useKeyPressEvent } from '../../../../hooks';

export function Search(): JSX.Element {
  const [open, setOpen] = React.useState(false);
  useKeyPressEvent(
    {
      targetKey: 'k',
      cmdKey: true,
    },
    () => {
      setOpen(true);
    },
  );
  return (
    <section>
      <BaseButton
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg border py-3 px-3.5 text-base text-gray-1100 hover:border-gray-700"
      >
        <IconSearch size={18} />
        <span className="ml-2 leading-none">Search</span>
        <span className="ml-4 flex gap-1.5 text-sm">
          <kbd className="rounded bg-gray-300 p-1 font-sans leading-none">
            {isSSRMode || navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
          </kbd>
          <kbd className="rounded bg-gray-300 py-1 px-1.5 font-sans leading-none">
            K
          </kbd>
        </span>
      </BaseButton>
      <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu">
        <Command.Input />

        <Command.List>
          {/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Fruits">
            <Command.Item>Apple</Command.Item>
            <Command.Item>Orange</Command.Item>
            <Command.Separator />
            <Command.Item>Pear</Command.Item>
            <Command.Item>Blueberry</Command.Item>
          </Command.Group>
          <Command.Item>Fish</Command.Item>
        </Command.List>
      </Command.Dialog>
    </section>
  );
}

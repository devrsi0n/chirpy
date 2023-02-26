import { Noop } from '@chirpy-dev/utils';

import { useEventListener } from './use-event-listener';

export type PressKey = {
  targetKey: string;
  cmdKey: boolean;
};

export function useKeyPressEvent(pressKey: PressKey, onKeyDown: Noop): void {
  function handleKeyDown(event: KeyboardEvent): void {
    if (
      event.key === pressKey.targetKey &&
      (pressKey.cmdKey ? event.metaKey || event.ctrlKey : true)
    ) {
      onKeyDown();
    }
  }

  useEventListener('keydown', handleKeyDown);
}

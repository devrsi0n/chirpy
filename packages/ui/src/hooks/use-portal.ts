import { isBrowser } from '@chirpy-dev/utils';
import * as React from 'react';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');
  el.setAttribute('id', id);
  return el;
};

export const usePortal = (
  selectId: string,
  getContainer?: () => HTMLElement | null,
): HTMLElement | null => {
  const id = `notification-${selectId}`;
  const [elSnapshot, setElSnapshot] = React.useState<HTMLElement | null>(() =>
    isBrowser ? createElement(id) : null,
  );

  React.useEffect(() => {
    const customContainer = getContainer?.() || null;
    const parentElement = customContainer || document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.append(el);
    }
    setElSnapshot(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return elSnapshot;
};

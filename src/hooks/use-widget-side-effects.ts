import * as React from 'react';

import { EVENT_CLICK_CONTAINER } from '$/lib/constants';

import { useRegisterNotification } from './use-register-notification';

export function useWidgetSideEffects(): void {
  useRegisterNotification();

  React.useEffect(() => {
    broadcastPageHeight();
    const observer = new MutationObserver(broadcastPageHeight);
    observer.observe(window.document.body, { attributes: false, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
}

function broadcastPageHeight(): void {
  const newHeight: number = document.body.scrollHeight;
  window.parent.postMessage({ height: newHeight }, '*');
}

function handleMessage(event: MessageEvent): void {
  if (event.data === EVENT_CLICK_CONTAINER) {
    unexpandedMenu('[id^="headlessui-menu-button"]');
    unexpandedMenu('[id^="headlessui-listbox-button"]');
  }
}

// Close Menu when user clicks on the out side of iframe
function unexpandedMenu(selectors: string): void {
  window.document.querySelectorAll<HTMLDivElement>(selectors).forEach((element) => {
    if (element.getAttribute('aria-expanded') === 'true') {
      element.click();
    }
  });
}

import * as React from 'react';

import { EVENT_CLICK_CONTAINER } from '$/lib/constants';

export function useWidgetSideEffects(): void {
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
    unexpandedPopup('[id^="headlessui-menu-button"]');
    unexpandedPopup('[id^="headlessui-listbox-button"]');
    unexpandedPopup('[id^="headlessui-popover-button"]');
  }
}

// Close popup when user clicks on the out side of iframe
function unexpandedPopup(selectors: string): void {
  window.document.querySelectorAll<HTMLDivElement>(selectors).forEach((element) => {
    if (element.getAttribute('aria-expanded') === 'true') {
      element.click();
    }
  });
}

import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  EVENT_CHANGE_THEME,
  EVENT_CLICK_CONTAINER,
  EVENT_WIDGET_LOADED,
} from '$/lib/constants';

/**
 * Register widget events
 */
export function useWidgetSideEffects(): void {
  React.useEffect(() => {
    broadcastPageHeight();
    const observer = new MutationObserver(broadcastPageHeight);
    observer.observe(window.document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    window.postMessage(EVENT_WIDGET_LOADED);
  }, []);

  const { setTheme } = useTheme();

  React.useEffect(() => {
    function handleMessage(event: MessageEvent): void {
      if (event.data === EVENT_CLICK_CONTAINER) {
        unexpandedPopup('[id^="headlessui-menu-button"]');
        unexpandedPopup('[id^="headlessui-listbox-button"]');
        unexpandedPopup('[id^="headlessui-popover-button"]');
      } else if (event.data.name === EVENT_CHANGE_THEME) {
        setTheme(event.data.value);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function broadcastPageHeight(): void {
  const newHeight: number = document.body.scrollHeight;
  window.parent.postMessage({ height: newHeight }, '*');
}

// Close popup when user clicks on the out side of iframe
function unexpandedPopup(selectors: string): void {
  window.document
    .querySelectorAll<HTMLDivElement>(selectors)
    .forEach((element) => {
      if (element.getAttribute('aria-expanded') === 'true') {
        element.click();
      }
    });
}

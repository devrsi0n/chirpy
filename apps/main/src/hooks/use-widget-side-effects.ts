import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  EVENT_CHANGE_THEME,
  EVENT_CLICK_CONTAINER,
  EVENT_WIDGET_LOADED,
} from '$/lib/constants';

import { useEventListener } from './use-event-listener';

/**
 * Register widget events
 */
export function useWidgetSideEffects(): void {
  React.useEffect(() => {
    function broadcastPageHeight(): void {
      const newHeight: number = document.body.scrollHeight;
      sendMessageToParentPage({ height: newHeight }, getProjectOrigin());
    }
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
    sendMessageToParentPage(EVENT_WIDGET_LOADED, getProjectOrigin());
  }, []);

  const { setTheme } = useTheme();

  useEventListener('message', (event) => {
    if (event.data === EVENT_CLICK_CONTAINER) {
      unexpandedPopup('[id^="headlessui-menu-button"]');
      unexpandedPopup('[id^="headlessui-listbox-button"]');
      unexpandedPopup('[id^="headlessui-popover-button"]');
    } else if (event.data.name === EVENT_CHANGE_THEME) {
      setTheme(event.data.value);
    }
  });
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

function sendMessageToParentPage(data: $TsAny, projectOrigin: string) {
  window.parent.postMessage(data, projectOrigin);
}

const getProjectOrigin = () =>
  new URL(location.href).searchParams.get('referrer') || '*';

import {
  EVENT_CHANGE_THEME,
  EVENT_CLICK_CONTAINER,
  EVENT_WIDGET_LOADED,
} from '@chirpy-dev/utils';
import { useTheme } from 'next-themes';
import * as React from 'react';

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
    // Dismiss popup/menu
    if (event.data === EVENT_CLICK_CONTAINER) {
      selectAllElements('[aria-expanded="true"]', () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });
      selectAllElements('[id^="headlessui-listbox-button"]', (element) => {
        if (element.getAttribute('aria-expanded') === 'true') {
          element.click();
        }
      });
      selectAllElements('[id^="headlessui-popover-button"]', (element) => {
        if (element.getAttribute('aria-expanded') === 'true') {
          element.click();
        }
      });
    } else if (event.data.name === EVENT_CHANGE_THEME) {
      setTheme(event.data.value);
    }
  });
}

function selectAllElements(
  selectors: string,
  onSelect: (el: HTMLElement) => void,
): void {
  window.document
    .querySelectorAll<HTMLDivElement>(selectors)
    .forEach((elm) => onSelect(elm));
}

function sendMessageToParentPage(data: $TsAny, projectOrigin: string) {
  window.parent.postMessage(data, projectOrigin);
}

const getProjectOrigin = () =>
  new URL(location.href).searchParams.get('referrer') || '*';

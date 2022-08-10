import {
  EVENT_CHANGE_THEME,
  EVENT_WIDGET_LOADED,
} from '../../../main/src/lib/constants';

const ATTR_THEME = 'data-chirpy-theme';

export function observeAndBroadcastThemeChange(
  iframe: HTMLIFrameElement,
  renderTarget: HTMLElement,
): void {
  // Post message on first load
  postThemeMessage(iframe, renderTarget);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === ATTR_THEME
      ) {
        postThemeMessage(iframe, mutation.target as HTMLElement);
      }
    });
  });

  observer.observe(renderTarget, {
    attributes: true,
    attributeFilter: [ATTR_THEME],
  });
}

let isWidgetLoaded = false;
const pendingEvents: { name: string; value: string }[] = [];

export function observeWidgetLoadedEvent(iframe: HTMLIFrameElement) {
  iframe.addEventListener('load', () => {
    iframe.contentWindow?.addEventListener('message', (e) => {
      if (e.data === EVENT_WIDGET_LOADED) {
        isWidgetLoaded = true;
        pendingEvents.forEach((e) => {
          iframe.contentWindow?.postMessage(e);
        });
      }
    });
  });
}

/**
 *
 * @param iframe
 * @param renderTarget
 */
function postThemeMessage(
  iframe: HTMLIFrameElement,
  renderTarget: HTMLElement,
): void {
  const value = renderTarget.getAttribute(ATTR_THEME);
  if (!value) {
    return;
  }
  const eventData = {
    name: EVENT_CHANGE_THEME,
    value,
  };
  if (isWidgetLoaded) {
    iframe.contentWindow?.postMessage(eventData);
  } else {
    pendingEvents.push(eventData);
  }
}

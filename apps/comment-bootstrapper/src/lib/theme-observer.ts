import { EVENT_CHANGE_THEME } from '../../../main/src/lib/constants';

const ATTR_THEME = 'data-chirpy-theme';

export function observeThemeAttributeChange(
  iframe: HTMLIFrameElement,
  renderTarget: HTMLElement,
): void {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === ATTR_THEME) {
        iframe.contentWindow?.postMessage({
          name: EVENT_CHANGE_THEME,
          value: (mutation.target as HTMLElement).getAttribute(ATTR_THEME),
        });
      }
    });
  });

  observer.observe(renderTarget, {
    attributes: true,
    attributeFilter: [ATTR_THEME],
  });
}

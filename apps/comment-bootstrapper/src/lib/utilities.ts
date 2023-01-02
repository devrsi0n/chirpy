import { WIDGET_DOMAIN } from './constants';

export function sendMessageToIframe(iframe: HTMLIFrameElement, message: any) {
  iframe.contentWindow?.postMessage(message, WIDGET_DOMAIN);
}

export function sendMessageToIframe(iframe: HTMLIFrameElement, message: any) {
  iframe.contentWindow?.postMessage(message, process.env.NEXT_PUBLIC_APP_URL);
}

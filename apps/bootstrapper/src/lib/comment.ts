import { EVENT_CLICK_CONTAINER } from '@chirpy-dev/utils';

import { client } from './client';
import { loadFlock } from './load-flock';
import {
  observeAndBroadcastThemeChange,
  observeWidgetLoadedEvent,
} from './theme-observer';
import { sendMessageToIframe } from './utilities';

/*
 * Widget entry for customers, this file should be minimal since this file is a external entry.
 */

const QUERY_SCRIPT = `[data-chirpy-domain]`;
const QUERY_RENDER_TARGET = `[data-chirpy-comment="true"]`;

// User init a page by import a script
// <script defer src="/widget/comment.js" data-chirpy-domain="yourdomain.com"><script>
// Render target: <div data-chirpy-comment="true"></div>
export async function initCommentWidget(): Promise<void> {
  // Get page url and init this page with a correct iframe
  // <iframe src="/widget/comment/xxxxx/xxxxxx"><iframe>
  const script: HTMLScriptElement | null = document.querySelector(QUERY_SCRIPT);
  if (!script) {
    console.error(
      `[Chirpy] Can't find the chirpy domain, did you forget to add ${QUERY_SCRIPT} to your script?`,
    );
    return;
  }
  const domain = script.dataset['chirpyDomain'];
  if (!domain) {
    console.error(`[Chirpy] No domain specified`);
    return;
  }
  const page = await client.page.byUrl.query({
    url: location.href,
    title: document.title,
    domain,
  });
  if (!page) {
    console.error('[Chirpy] Unexpected empty response');
    return;
  }
  loadFlock();
  const renderTarget: HTMLElement | null =
    document.querySelector(QUERY_RENDER_TARGET);
  if (!renderTarget) {
    console.log(
      `[Chirpy] No comment target ${QUERY_RENDER_TARGET}, ignore this message if you only want to integrate analytics`,
    );
    return;
  }
  const id = getIframeId(page.id);
  if (document.querySelector(`#${id}`)) {
    // Already bootstrapped
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.style.width = '100%';
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  let previousHeight = 0;
  window.addEventListener(
    'message',
    (event) => {
      if (
        event.origin === process.env.NEXT_PUBLIC_APP_URL &&
        event.data?.height &&
        event.data?.height !== previousHeight
      ) {
        iframe.style.height = event.data.height + 'px';
        previousHeight = event.data.height;
      }
    },
    false,
  );
  document.body.addEventListener('click', () => {
    sendMessageToIframe(iframe, EVENT_CLICK_CONTAINER);
  });
  observeWidgetLoadedEvent(iframe);
  iframe.src = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/widget/comment/${encodeURIComponent(page.url)}?referrer=${location.origin}`;
  observeAndBroadcastThemeChange(iframe, renderTarget);
  renderTarget.append(iframe);
}

const getIframeId = (id: string) => `chirpy-${id}`;

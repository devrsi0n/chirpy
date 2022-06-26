import { EVENT_CLICK_CONTAINER } from '../../../main/src/lib/constants';
import { ERR_UNMATCHED_DOMAIN } from '../../../main/src/server/common/error-code';
import type { ResponseError } from '../../../main/src/server/types/error';
import type { GetPagByUrl } from '../../../main/src/server/types/page';
import { observeThemeAttributeChange } from './theme-observer';

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
  const script: HTMLScriptElement | null =
    window.document.querySelector(QUERY_SCRIPT);
  if (!script) {
    throw new Error(
      `Can't find the chirpy domain, did you forget to add ${QUERY_SCRIPT} to your script?`,
    );
  }
  const domain = script.dataset['chirpyDomain'];
  if (!domain) {
    throw new Error(`No domain specified`);
  }

  const renderTarget: HTMLElement | null =
    window.document.querySelector(QUERY_RENDER_TARGET);
  if (!renderTarget) {
    throw new Error(
      `Can't find the render target, did you forget to add ${QUERY_RENDER_TARGET}?`,
    );
  }
  const { origin, pathname } = window.location;
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/page?domain=${domain}&url=${encodeURIComponent(
      origin + pathname,
    )}&title=${encodeURIComponent(window.document.title)}`,
  );
  const page: GetPagByUrl = await res.json();
  if (isResponseError(page)) {
    if (page.code == ERR_UNMATCHED_DOMAIN) {
      return console.error(page.error);
    }
    throw new Error(page.error);
  }
  if (!page) {
    console.error('Unexpected null from response');
    return;
  }
  const id = getIframeId(page.id);
  if (window.document.querySelector(`#${id}`)) {
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
  window.document.body.addEventListener('click', () => {
    iframe.contentWindow?.postMessage(EVENT_CLICK_CONTAINER);
  });
  iframe.src = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/widget/comment/${encodeURIComponent(page.url)}`;
  observeThemeAttributeChange(iframe, renderTarget);
  renderTarget.append(iframe);
}

function isResponseError(res: GetPagByUrl): res is ResponseError {
  return !!(res as ResponseError).error;
}

const getIframeId = (id: string) => `chirpy-${id}`;

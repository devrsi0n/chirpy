import { EVENT_CLICK_CONTAINER } from '../lib/constants';
import { ERR_UNMATCHED_DOMAIN } from '../server/common/error-code';
import { ResponseError } from '../server/types/error';
import { GetPagByUrl } from '../server/types/page';

/*
 * Widget entry for customers, this file should be minimal since this file is a external entry.
 */

const scriptQuery = `[data-chirpy-domain]`;
const targetQuery = `[data-chirpy-comment="true"]`;

// User init a page by import a script
// <script defer src="/widget/comment.js" data-chirpy-domain="yourdomain.com"><script>
// Render target: <div data-chirpy-comment="true"></div>
export async function comment(): Promise<void> {
  // Get page url and init this page with a correct iframe
  // <iframe src="/widget/comment/xxxxx/xxxxxx"><iframe>
  const script: HTMLScriptElement | null = window.document.querySelector(scriptQuery);
  if (!script) {
    console.error(`Can't find the chirpy script`);
    return Promise.reject();
  }
  const domain = script.dataset['chirpyDomain'];
  if (!domain) {
    console.error(`No domain specified`);
    return Promise.reject();
  }

  const renderTarget: HTMLElement | null = window.document.querySelector(targetQuery);
  if (!renderTarget) {
    console.error(`Can't find the render target`);
    return Promise.reject();
  }
  const { origin, pathname } = window.location;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/page?domain=${domain}&url=${encodeURIComponent(
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
    return;
  }
  const container = document.createElement('iframe');
  container.id = id;
  container.style.width = '100%';
  container.frameBorder = '0';
  container.scrolling = 'no';
  let previousHeight = 0;
  window.addEventListener(
    'message',
    (event) => {
      if (
        event.origin === process.env.NEXT_PUBLIC_APP_URL &&
        event.data?.height &&
        event.data?.height !== previousHeight
      ) {
        container.style.height = event.data.height + 'px';
        previousHeight = event.data.height;
      }
    },
    false,
  );
  window.document.body.addEventListener('click', () => {
    container.contentWindow?.postMessage(EVENT_CLICK_CONTAINER);
  });
  container.src = `${process.env.NEXT_PUBLIC_APP_URL}/widget/comment/${encodeURIComponent(
    page.url,
  )}`;
  renderTarget.append(container);
}

function isResponseError(res: GetPagByUrl): res is ResponseError {
  return !!(res as ResponseError).error;
}

const getIframeId = (id: string) => `chirpy-${id}`;

export { APP_NAME_LOWERCASE as appName } from '../lib/constants';

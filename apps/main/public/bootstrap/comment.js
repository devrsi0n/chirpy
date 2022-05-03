(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  const EVENT_CLICK_CONTAINER = "EVENT_CLICK_CONTAINER";
  const ERR_UNMATCHED_DOMAIN = "ERR_UNMATCHED_DOMAIN";
  const scriptQuery = `[data-chirpy-domain]`;
  const targetQuery = `[data-chirpy-comment="true"]`;
  async function comment() {
    const script = window.document.querySelector(scriptQuery);
    if (!script) {
      throw new Error(`Can't find the chirpy domain, did you forget to add ${scriptQuery} to your script?`);
    }
    const domain = script.dataset["chirpyDomain"];
    if (!domain) {
      throw new Error(`No domain specified`);
    }
    const renderTarget = window.document.querySelector(targetQuery);
    if (!renderTarget) {
      throw new Error(`Can't find the render target, did you forget to add ${targetQuery}?`);
    }
    const { origin, pathname } = window.location;
    const res = await fetch(`${"http://localhost:3000"}/api/page?domain=${domain}&url=${encodeURIComponent(origin + pathname)}&title=${encodeURIComponent(window.document.title)}`);
    const page = await res.json();
    if (isResponseError(page)) {
      if (page.code == ERR_UNMATCHED_DOMAIN) {
        return console.error(page.error);
      }
      throw new Error(page.error);
    }
    if (!page) {
      console.error("Unexpected null from response");
      return;
    }
    const id = getIframeId(page.id);
    if (window.document.querySelector(`#${id}`)) {
      return;
    }
    const container = document.createElement("iframe");
    container.id = id;
    container.style.width = "100%";
    container.frameBorder = "0";
    container.scrolling = "no";
    let previousHeight = 0;
    window.addEventListener("message", (event) => {
      var _a, _b;
      if (event.origin === "http://localhost:3000" && ((_a = event.data) == null ? void 0 : _a.height) && ((_b = event.data) == null ? void 0 : _b.height) !== previousHeight) {
        container.style.height = event.data.height + "px";
        previousHeight = event.data.height;
      }
    }, false);
    window.document.body.addEventListener("click", () => {
      var _a;
      (_a = container.contentWindow) == null ? void 0 : _a.postMessage(EVENT_CLICK_CONTAINER);
    });
    container.src = `${"http://localhost:3000"}/widget/comment/${encodeURIComponent(page.url)}`;
    renderTarget.append(container);
  }
  function isResponseError(res) {
    return !!res.error;
  }
  const getIframeId = (id) => `chirpy-${id}`;
  const win = window;
  if (win && !win.disableAutoInjection) {
    comment();
    win.Chirpy = {
      comment
    };
  }
});
//# sourceMappingURL=comment.js.map

(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  const sw$1 = self;
  function openOrFocusWindow(url) {
    const urlToOpen = new URL(url, sw$1.location.origin).href;
    return sw$1.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((windowClients) => {
      let matchingClient = null;
      for (const windowClient of windowClients) {
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }
      return matchingClient ? matchingClient.focus() : sw$1.clients.openWindow(urlToOpen);
    });
  }
  const sw = self;
  sw.addEventListener("push", (event) => {
    var _a;
    if (((_a = sw.Notification) == null ? void 0 : _a.permission) !== "granted" || !event.data) {
      return;
    }
    const message = event.data.json();
    event.waitUntil(sw.registration.showNotification(message.title, {
      requireInteraction: true,
      icon: "/favicon.png",
      data: message,
      body: `"${message.body}"`,
      tag: message.url
    }));
  });
  sw.addEventListener("notificationclick", (event) => {
    const clickedNotification = event.notification;
    const data = event.notification.data;
    clickedNotification.close();
    const promiseChain = openOrFocusWindow(data.url);
    event.waitUntil(promiseChain);
  });
  const CACHE_ID = "1651475985976";
  sw.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE_ID).then((cache) => cache.addAll(["/"])));
  });
  sw.addEventListener("fetch", (e) => {
    e.respondWith((async () => {
      if (e.request.mode === "navigate" && e.request.method === "GET" && sw.registration.waiting && (await sw.clients.matchAll()).length < 2) {
        sw.registration.waiting.postMessage("skipWaiting");
        return new Response("", { headers: { Refresh: "0" } });
      }
      return await caches.match(e.request) || fetch(e.request);
    })());
  });
  sw.addEventListener("activate", (e) => {
    e.waitUntil(caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key != CACHE_ID)
          return caches.delete(key);
      }));
    }));
  });
  sw.addEventListener("message", (e) => {
    if (e.data === "skipWaiting") {
      sw.skipWaiting();
    }
  });
});
//# sourceMappingURL=sw.js.map

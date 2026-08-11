/* Tour d'Italia — offline shell.
   Navigations and app code are network-first so a corrected itinerary always wins;
   the cached copy is the fallback when there's no signal. Only immutable assets
   (icon, fonts) are cache-first. Live data is network-first with a cached fallback. */
const VERSION = "tour-ditalia-pages-v1";
const SHELL = [
  "./",
  "./index.html",
  "./support.js",
  "./manifest.json",
  "./decisions.html",
  "./doc-page.js",
  "./icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const isData = url => /open-meteo\.com|er-api\.com/.test(url);
const isImmutable = url => /\.(woff2?|ttf|svg|png|jpg|webp)(\?|$)/i.test(url) || /fonts\.gstatic\.com/.test(url);

/* network-first: fresh when online, cached when not */
const networkFirst = req =>
  fetch(req)
    .then(res => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    })
    .catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")));

/* cache-first: only for things that never change */
const cacheFirst = req =>
  caches.match(req).then(hit =>
    hit ||
    fetch(req).then(res => {
      if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    })
  );

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate" || isData(req.url) || !isImmutable(req.url)) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

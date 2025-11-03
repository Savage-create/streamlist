/* StreamList service worker */
const CACHE_NAME = "streamlist-cache-v1";

/** App shell to precache */
const CORE = [
  "/",              // vite dev serves index at /
  "/index.html",
  "/manifest.webmanifest"
];

/** Install: cache core app shell */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(CORE)));
  self.skipWaiting();
});

/** Activate: clean old caches */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined)))
    )
  );
  self.clients.claim();
});

/**
 * Fetch strategy:
 *  - API (TMDB) & poster CDN => network-first, fallback to cache
 *  - Everything else (static assets) => cache-first, fallback to network
 */
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isAPI =
    url.hostname.includes("api.themoviedb.org") ||
    url.hostname.includes("image.tmdb.org") ||
    url.pathname.includes("/3/");

  if (isAPI) {
    e.respondWith(
      fetch(req)
        .then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          return resp;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // static: cache-first
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((resp) => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          return resp;
        })
    )
  );
});

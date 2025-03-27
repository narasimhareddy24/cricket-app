// This will be replaced with the actual precache manifest during build
const manifest = self.__WB_MANIFEST;

const CACHE_NAME = 'my-react-cache-v1';
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Forces update immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim(); // Ensures control over all tabs
});

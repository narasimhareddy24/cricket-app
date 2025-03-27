// This will be replaced with the actual precache manifest during build
const manifest = self.__WB_MANIFEST;

const CACHE_NAME = 'my-react-cache-v1';

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache the __WB_MANIFEST array
        return cache.addAll(manifest.map(entry => entry.url));
      })
  );
});

// Fetch event (same as before)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
  );
});

// Activate event (same as before)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => 
        key !== CACHE_NAME ? caches.delete(key) : null
      ))
    )
  );
});
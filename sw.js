importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded!');

  // Precache your files
  workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './js/app.js', revision: '1' },
    { url: './css/styles.css', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './images/icons/', revision: '1' },
    { url: './sw.js', revision: '1' },
  ]);

  // Cache third-party scripts (Monaco and Emmet)
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://cdn.jsdelivr.net' || url.origin === 'https://unpkg.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'external-resources',
    })
  );
} else {
  console.error('Workbox failed to load.');
}
const CACHE_NAME = 'my-app-cache-v1'; // Update with your current cache name
const EXPECTED_CACHES = [CACHE_NAME];

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!EXPECTED_CACHES.includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

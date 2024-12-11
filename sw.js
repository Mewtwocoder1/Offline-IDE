importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded!');

  // Precache essential files
  workbox.precaching.precacheAndRoute([
    { url: './index.html', revision: '1' },
    { url: './css/styles.css', revision: '1' },
    { url: './js/app.js', revision: '1' },
    { url: './manifest.json', revision: '1' },
    { url: './images/icons/icon-192x192.png', revision: '1' },
    { url: './images/icons/icon-512x512.png', revision: '1' }
  ]);

  // Cache external resources (e.g., CDN scripts)
  workbox.routing.registerRoute(
    ({ url }) => url.origin.includes('cdn.jsdelivr.net') || url.origin.includes('unpkg.com'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'external-resources',
    })
  );
} else {
  console.error('Workbox failed to load.');
}

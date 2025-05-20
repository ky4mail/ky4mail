const CACHE_NAME = 'hello-pwa-v1';
const urlsToCache = [
  '/ky4mail/',
  '/ky4mail/index.html',
  '/ky4mail/style.css',
  '/ky4mail/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

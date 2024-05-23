const cacheElements = [
  '/',
  '/sw.js',
  '/common.css',
  '/public/manifest.json',
  '/assets',
];
const CACHE_NAME = 'green-red-light-game-0.0.1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.has(CACHE_NAME).then(function (cacheExists) {
      if (!cacheExists) {
        caches.open(CACHE_NAME).then(function (cache) {
          console.log('Opened cache', cacheElements);
          for (let i = 0; i < cacheElements.length; i++) {
            const file = cacheElements[i];
            cache
              .add(file)
              .catch(error => console.log('caching file error', file, error));
          }
        });
      }
    })
  );
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      try {
        if (response) {
          return response;
        }
        fetch(event.request)
          .then(r => {
            return r;
          })
          .catch(e => {
            console.log('fetch error', e);
          });
      } catch (e) {
        console.log('fetch error-', e);
      }
    })
  );
});

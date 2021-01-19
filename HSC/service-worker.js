// self.addEventListener('fetch', function(event) {});

const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'contacts.php',
  'css/style.css',
  'css/bootstrap.min.css',
  'images/shsc-logo.png',
  'css/font-awesome.min.css',
  'fonts/fontawesome-webfont.woff2'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});

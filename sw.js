var CACHE_NAME = 'GGCMaps-cache-v1.4.2';
// baseURL is used to switch between hosting structures.
// Set to null ('') for regular hosting
// Set to directory inside Github Pages
var baseURL = '/ggcmaps/';
var urlsToCache = [
  baseURL + 'js/script.min.js',
  baseURL + 'js/roomNames.json',
  baseURL + 'index.html',
  baseURL + 'images/bars.svg',
  baseURL + 'images/caret-down.svg',
  baseURL + 'images/arrow-right.svg',
  baseURL + 'images/arrow-left.svg',
  baseURL + 'favicon.ico',
  baseURL + 'css/styles.css',
  baseURL + 'images/launcher-icon-1x.png',
  baseURL + 'images/launcher-icon-2x.png',
  baseURL + 'images/launcher-icon-3x.png',
  baseURL + 'images/launcher-icon-4x.png',
  baseURL + 'Building/A/First-Floor.html',
  baseURL + 'Building/B/first-floor.html',
  baseURL + 'Building/B/second-floor.html',
  baseURL + 'Building/B/third-floor.html',
  baseURL + 'Building/C/First-Floor.html',
  baseURL + 'Building/C/Second-Floor.html',
  baseURL + 'Building/C3/Ground-Floor.html',
  baseURL + 'Building/C3/First-Floor.html',
  baseURL + 'Building/C3/Second-Floor.html',
  baseURL + 'Building/D/First-Floor.html',
  baseURL + 'Building/D/Second-Floor.html',
  baseURL + 'Building/E/First-Floor.html',
  baseURL + 'Building/E/Second-Floor.html',
  baseURL + 'Building/E/Third-Floor.html',
  baseURL + 'Building/F/First-Floor.html',
  baseURL + 'Building/F/Second-Floor.html',
  baseURL + 'Building/H/First-Floor.html',
  baseURL + 'Building/H/Second-Floor.html',
  baseURL + 'Building/H/Third-Floor.html',
  baseURL + 'Building/I/First-Floor.html',
  baseURL + 'Building/I/Second-Floor.html',
  baseURL + 'Building/I/Third-Floor.html',
  baseURL + 'Building/L/First-Floor.html',
  baseURL + 'Building/L/Second-Floor.html',
  baseURL + 'Building/L/Third-Floor.html',
  baseURL + 'help.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

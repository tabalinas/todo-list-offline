
var CACHE_NAME = 'todo-list-offline-v1';
var urlsToCache = [
    '/todo-list-offline/app/another.html'
];

self.addEventListener('install', function(event) {
    console.log("installing");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log("cache opened");
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    console.log("fetching");
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                console.log("cache hit");
                if (response) {
                    return response;
                }

                return fetch(event.request);
            })
    );
});
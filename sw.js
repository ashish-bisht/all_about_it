// Service Worker for Learn PWA
const CACHE_NAME = 'principal-prep-v3-latest';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/learn.html',
    '/game.html',
    '/flashcard.html',
    '/revision.html',
    '/templates.html',
    '/script.js',
    '/style.css',
    '/topicLoader.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(err => console.log('Cache failed:', err))
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Network First (Freshness over Speed)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // If network works, update cache and return fresh content
                if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Network failed (Offline), try cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) return cachedResponse;

                        // Fallback for navigation
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

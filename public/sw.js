const CACHE_VERSION = 'V1'
const mysStaticCache = [
    '/index.html',
    '/assets/index.js',
    '/index.css'
];

/**
 * This is triggered when this particular service worker begins installing
 * It is a good time to cache you assets. (HTML and CSS)
 */
self.addEventListener('install', (event) => {
    // Cache your static cache. This has to be completed for the install event to be marked as
    // Successful
    event.waitUntil(async () => {
        const cache = await caches.open(CACHE_VERSION)
        await cache.addAll(mysStaticCache)
    })
})

/**
 * When the current service worker is being activated.
 * This is the best time to delete your old cache
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(async () => {
        const cacheKeepList = [CACHE_VERSION];
        const keyList = await caches.keys()
        const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
        await Promise.all(cachesToDelete.map(deleteCache));
    })
})

/**
 * Listen for network requests and respond accordingly
 * Here you have the absolute power
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(new Response('Response from service worker'))
})
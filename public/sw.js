const CACHE_VERSION = 'V1'
const mysStaticCache = [
    '/',
    '/assets/index.js',
    '/index.css'
];
const handleResponse = async (event) => {
    const cachedResponse = await caches.match(event.request)
    if (cachedResponse) {
        return cachedResponse
    }
    return new Response('Response from service worker')
};
const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(resources);
};

/**
 * This is triggered when this particular service worker begins installing
 * It is a good time to cache you assets. (HTML and CSS)
 */
self.addEventListener('install', (event) => {
    // Cache your static cache. This has to be completed for the install event to be marked as
    // Successful
    event.waitUntil(addResourcesToCache(mysStaticCache));
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
    event.respondWith(handleResponse(event));
})
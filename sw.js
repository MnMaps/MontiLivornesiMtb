const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/index.js',
    '/main.js',
    '/style.css',
    'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css',
    'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js',
    'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.1/proj4.js',
    'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.1/proj4-src.js'
];

// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil( 
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
   
});

// activate event
self.addEventListener('activate', evt => {

});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
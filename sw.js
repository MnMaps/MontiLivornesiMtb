const staticCacheName = "site-static-v2";
const assets = [
    '/MontiLivornesiMtb/',
    '/MontiLivornesiMtb/index.html',
    '/MontiLivornesiMtb/app.js',
    '/MontiLivornesiMtb/main.js',
    '/MontiLivornesiMtb/sidenav.js',
    '/MontiLivornesiMtb/style.css',
    '/MontiLivornesiMtb/pages/about.html',
    '/MontiLivornesiMtb/pages/contact.html',
    '/MontiLivornesiMtb/pages/fbIcon.png',
    '/MontiLivornesiMtb/pages/fbMessIcon.png',
    '/MontiLivornesiMtb/data/raster/location.png',
    '/MontiLivornesiMtb/data/raster/locationBtn.png',
    '/MontiLivornesiMtb/data/raster/MappaGiu.png',
    '/MontiLivornesiMtb/data/raster/MappaSu.png',
    '/MontiLivornesiMtb/data/vector/00Path3003.geojson',
    '/MontiLivornesiMtb/data/vector/MTB.geojson',
    '/MontiLivornesiMtb/data/vector/NumberedPathFull3003.geojson',
    '/MontiLivornesiMtb/data/vector/onoffMtb.geojson',
    '/MontiLivornesiMtb/data/vector/PathTrack3003.geojson',
    '/MontiLivornesiMtb/data/vector/StartStop3003.geojson',
    '/MontiLivornesiMtb/materialize/css/materialize.min.css',
    '/MontiLivornesiMtb/materialize/js/materialize.min.js',
    'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css',
    'https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js',
    'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.1/proj4.js',
    'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.1/proj4-src.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil( 
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
   
});

// activate event
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});
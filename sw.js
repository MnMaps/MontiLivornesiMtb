const staticCacheName = "site-static-v1";
const assets = [
    '/testPWA/',
    '/testPWA/index.html',
    '/testPWA/app.js',
    '/testPWA/main.js',
    '/testPWA/sidenav.js',
    '/testPWA/style.css',
    '/testPWA/pages/about.html',
    '/testPWA/pages/contact.html',
    '/testPWA/pages/fbIcon.png',
    '/testPWA/pagesfbMessIcon.png',
    '/testPWA/data/raster/location.png',
    '/testPWA/data/raster/locationBtn.png',
    '/testPWA/data/raster/MappaGiu.png',
    '/testPWA/data/raster/MappaSu.png',
    '/testPWA/data/vector/00Path3003.geojson',
    '/testPWA/data/vector/MTB.geojson',
    '/testPWA/data/vector/NumberedPathFull3003.geojson',
    '/testPWA/data/vector/onoffMtb.geojson',
    '/testPWA/data/vector/PathTrack3003.geojson',
    '/testPWA/data/vector/StartStop3003.geojson',
    '/testPWA/materialize/css/materialize.min.css',
    '/testPWA/materialize/js/materialize.min.js',
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
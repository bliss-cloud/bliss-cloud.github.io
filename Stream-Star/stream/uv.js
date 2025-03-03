importScripts('/Stream-Star/stream/uv/uv.bundle.js');
importScripts('/Stream-Star/stream/uv/uv.config.js');
importScripts('/Stream-Star/stream/uv/uv.sw.js');
importScripts('https://arc.io/arc-sw-core.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

// 离线缓存：先用缓存马上打开游戏，同时在后台取新版本，下次打开就是新的
const CACHE = 'kids-games-v1';
const ASSETS = [
  './kids.html',
  './tiaoqi.html',
  './kids.webmanifest',
  './tiaoqi.webmanifest',
  './icons/wuziqi-180.png',
  './icons/wuziqi-192.png',
  './icons/wuziqi-512.png',
  './icons/tiaoqi-180.png',
  './icons/tiaoqi-192.png',
  './icons/tiaoqi-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const fresh = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (cached) {
        event.waitUntil(fresh);
        return cached;
      }
      return (await fresh) || new Response('离线了，请联网后再打开一次', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })
  );
});

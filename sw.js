// 离线缓存：先用缓存马上打开游戏，同时在后台取新版本，下次打开就是新的
const CACHE = 'kids-games-v15';
const ASSETS = [
  './',
  './index.html',
  './all.webmanifest',
  './icons/all-180.png',
  './icons/all-192.png',
  './icons/all-512.png',
  './kids.html',
  './tiaoqi.html',
  './doushouqi.html',
  './chess.html',
  './huijia.html',
  './fendongxi.html',
  './fanpai.html',
  './tianping.html',
  './shuzhou.html',
  './qiang21.html',
  './migong.html',
  './shudu.html',
  './clock.html',
  './tuiguo.html',
  './guilv.html',
  './fangzi.html',
  './kids.webmanifest',
  './tiaoqi.webmanifest',
  './doushouqi.webmanifest',
  './chess.webmanifest',
  './huijia.webmanifest',
  './fen.webmanifest',
  './fanpai.webmanifest',
  './tianping.webmanifest',
  './shuzhou.webmanifest',
  './qiang21.webmanifest',
  './migong.webmanifest',
  './shudu.webmanifest',
  './clock.webmanifest',
  './tuiguo.webmanifest',
  './guilv.webmanifest',
  './fangzi.webmanifest',
  './icons/wuziqi-180.png',
  './icons/wuziqi-192.png',
  './icons/wuziqi-512.png',
  './icons/tiaoqi-180.png',
  './icons/tiaoqi-192.png',
  './icons/tiaoqi-512.png',
  './icons/doushouqi-180.png',
  './icons/doushouqi-192.png',
  './icons/doushouqi-512.png',
  './icons/chess-180.png',
  './icons/chess-192.png',
  './icons/chess-512.png',
  './icons/huijia-180.png',
  './icons/huijia-192.png',
  './icons/huijia-512.png',
  './icons/fen-180.png',
  './icons/fen-192.png',
  './icons/fen-512.png',
  './icons/fanpai-180.png',
  './icons/fanpai-192.png',
  './icons/fanpai-512.png',
  './icons/tianping-180.png',
  './icons/tianping-192.png',
  './icons/tianping-512.png',
  './icons/shuzhou-180.png',
  './icons/shuzhou-192.png',
  './icons/shuzhou-512.png',
  './icons/qiang21-180.png',
  './icons/qiang21-192.png',
  './icons/qiang21-512.png',
  './icons/migong-180.png',
  './icons/migong-192.png',
  './icons/migong-512.png',
  './icons/shudu-180.png',
  './icons/shudu-192.png',
  './icons/shudu-512.png',
  './icons/clock-180.png',
  './icons/clock-192.png',
  './icons/clock-512.png',
  './icons/tuiguo-180.png',
  './icons/tuiguo-192.png',
  './icons/tuiguo-512.png',
  './icons/guilv-180.png',
  './icons/guilv-192.png',
  './icons/guilv-512.png',
  './icons/fangzi-180.png',
  './icons/fangzi-192.png',
  './icons/fangzi-512.png',
  './icons/emoji/1f3e0.png',
  './icons/emoji/1f406.png',
  './icons/emoji/1f418.png',
  './icons/emoji/1f423.png',
  './icons/emoji/1f427.png',
  './icons/emoji/1f428.png',
  './icons/emoji/1f42d.png',
  './icons/emoji/1f42f.png',
  './icons/emoji/1f430.png',
  './icons/emoji/1f431.png',
  './icons/emoji/1f436.png',
  './icons/emoji/1f437.png',
  './icons/emoji/1f438.png',
  './icons/emoji/1f43a.png',
  './icons/emoji/1f43b.png',
  './icons/emoji/1f43c.png',
  './icons/emoji/1f981.png',
  './icons/emoji/1f984.png',
  './icons/emoji/1f98a.png',
  './icons/emoji/1f998.png',
  './icons/emoji/1f9d1.png',
  './icons/emoji/2b50.png',
  './icons/emoji/1f680.png',
  './icons/emoji/1f9e0.png',
  './icons/emoji/1f330.png',
  './icons/emoji/1f3d8.png',
  './icons/emoji/1f4c8.png',
  './icons/emoji/1f501.png',
  './icons/emoji/1f50e.png',
  './icons/emoji/1f522.png',
  './icons/emoji/1f575.png',
  './icons/emoji/1f9e9.png',
  './icons/emoji/23f0.png',
  './icons/emoji/274c.png',
  './icons/emoji/2753.png',
  './icons/emoji/1f347.png',
  './icons/emoji/1f34c.png',
  './icons/emoji/1f34e.png',
  './icons/emoji/1f353.png',
  './icons/emoji/1f36a.png',
  './icons/emoji/1f36c.png',
  './icons/emoji/1f435.png',
  './icons/emoji/1f439.png',
  './icons/emoji/1f955.png',
  './icons/emoji/1f9fa.png',
  './icons/emoji/2705.png',
  './icons/emoji/1f349.png',
  './icons/emoji/1f3b4.png',
  './icons/emoji/1f3c1.png',
  './icons/emoji/1f3c6.png',
  './icons/emoji/1f467.png',
  './icons/emoji/1f64b.png',
  './icons/emoji/1fab7.png',
  './icons/emoji/2696.png',
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

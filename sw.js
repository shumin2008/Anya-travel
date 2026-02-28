// 每次修改 index.html 後，請把下面這行的 v1 改成 v2, v3... 以強制更新
const CACHE_NAME = 'shisa-trip-v2026-03-01'; 

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@phosphor-icons/web',
  'https://cdn.phototourl.com/uploads/2026-02-27-dbb392e6-6884-4b06-980b-2719bb6c5aa5.png', // Icon
  'https://cdn.phototourl.com/uploads/2026-02-27-c58164d7-98bb-4a27-aad2-0d7b756f4be4.jpg'  // Logo
];

// 1. 安裝：把清單中的資源存入快取
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. 激活：刪除舊版本的快取，釋放空間並確保拿到新版
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// 3. 攔截請求：優先從快取抓取，斷網時也能顯示
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});

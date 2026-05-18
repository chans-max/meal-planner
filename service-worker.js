// 오늘 뭐먹지 - Service Worker
const CACHE_VERSION = 'nutritionist-v1.0.0';
const CACHE_NAME = `cache-${CACHE_VERSION}`;

// 캐싱할 핵심 파일들
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// 폰트 등 외부 리소스 (cache-first)
const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
];

// Install: 핵심 파일 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('일부 리소스 캐싱 실패:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: 이전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: 전략별 처리
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Gemini API 호출은 절대 캐싱하지 않음 (항상 네트워크)
  if (url.hostname.includes('generativelanguage.googleapis.com')) {
    return;
  }

  // POST 등 GET 외 요청은 건너뜀
  if (event.request.method !== 'GET') {
    return;
  }

  // 폰트 CDN: cache-first
  if (url.hostname.includes('jsdelivr.net') || url.hostname.includes('googleapis.com')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // 앱 자체 파일: network-first, fallback to cache
  event.respondWith(
    fetch(event.request).then((res) => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return res;
    }).catch(() => {
      return caches.match(event.request).then((cached) => {
        if (cached) return cached;
        // 페이지 요청이면 index.html로 fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

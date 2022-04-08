const static = "todo";
const assets = [
  "/",
  "/index.html",
  "/main.css",
  "/app32.png",
  "/app512.png",
  "/favicon.ico",
  "/main.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(static).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

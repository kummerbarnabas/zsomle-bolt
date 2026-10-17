// Internet nélküli működés: a program fájljait gyorsítótárba teszi.
const C='zsomle-bolt-v18';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','termekek.json','manifest.json','apple-touch-icon.png']))));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r;}).catch(()=>caches.match(e.request))));

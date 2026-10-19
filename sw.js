// Internet nélküli működés: a program fájljait gyorsítótárba teszi.
// Mindig a hálózatot kérdezi először, a böngésző HTTP-gyorsítótárát megkerülve (2026-10-17: a tablet régi változatot kapott).
const C='zsomle-bolt-v29';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','termekek.json','fajtak.json','kifogyas.json','logo-foodora.png','logo-munch.png','manifest.json','apple-touch-icon.png'])));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin)){return;}
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r;}).catch(()=>caches.match(e.request)));});

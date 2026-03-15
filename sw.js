const VERSION = "v7"; // cambia cuando actualices

const CACHE_NAME = "f1-app-" + VERSION;

const urlsToCache = [

"/",
"/index.html",
"/style.css",

"/noticias.html",
"/calendario.html",
"/ultima.html",
"/clasificacion.html",
"/pilotos.html",
"/constructores.html",
"/comparador.html",
"/alonso.html",
"/analisis.html",
"/directo.html",
"/onboard.html",
"/racecontrol.html",
"/telemetria.html",
"/livetiming.html",
"/mapa.html",
"/tv.html"

];

// INSTALAR
self.addEventListener("install", event => {

self.skipWaiting();

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))

);

});

// ACTIVAR
self.addEventListener("activate", event => {

event.waitUntil(

caches.keys().then(keys => {

return Promise.all(

keys
.filter(key => key !== CACHE_NAME)
.map(key => caches.delete(key))

);

})

);

self.clients.claim();

});

// FETCH (cache inteligente)
self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request).then(response => {

if(response){

return response;

}

return fetch(event.request).then(networkResponse => {

return caches.open(CACHE_NAME).then(cache => {

cache.put(event.request, networkResponse.clone());

return networkResponse;

});

}).catch(() => {

return caches.match("/index.html");

});

})

);

});
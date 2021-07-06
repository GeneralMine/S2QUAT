import { timestamp } from "$service-worker";

const MY_CACHE = `cache${timestamp}`;

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                return caches.open(MY_CACHE).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                })
            })
            .catch(() => {
                return caches.match(event.request);
            })
    )
});

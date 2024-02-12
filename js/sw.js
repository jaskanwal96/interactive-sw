self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            const urlsToCache = [
                '/index.html',
                '/css/styles.css',
                '/js/index.js',
                '/assets/ai.png'
            ]
            return Promise.all(urlsToCache.map(url => {
                return fetch(url).then(response => {
                    if (response.ok) {
                        console.error(`Caching ${url}`)
                        return cache.put(url, response)
                    }
                    console.error(`Could not cache ${url}: ${response.statusText}`)
                    return Promise.reject(`Failed to cache ${url}`)
                }).catch(error => {
                    console.error(`Fetch failed for ${url}: ${error}`)
                })
            }))
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            console.log('Cache match', response)
            return response || fetch(event.request)
        })
    )
})

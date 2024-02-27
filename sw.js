const DATA_CACHE_NAME = 'todo-list-data-v1'
const CACHE_NAME = 'v1'

const urlsToCache = [
  '/index.html',
  '/assets/ai.png',
  '/favicon.ico',
  '/js/index.js',
  '/js/todo-cache.js',
]

self.addEventListener('install', event => {
  console.log('Install event', event)
  event.waitUntil(
    caches.open('v1').then(cache => {
      return Promise.all(urlsToCache.map(url => {
        return fetch(url).then(async (response) => {
          if (response.ok) {
            console.log(`Caching ${url}`)
            return cache.put(url, response)
          }
          console.log(`Could not cache ${url}: ${response.statusText}`)
          return Promise.reject(`Failed to cache ${url}`)
        }).catch(error => {
          console.error(`Fetch failed for ${url}: ${error}`)
        })
      })).catch(error => {console.log('Promise all Error', error)})
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('Cache match', event.request.url, response)
      return response || fetch(event.request)
    })
  )
})

// Add descriptive comments to the following functions describing their purpose

self.addEventListener('notificationclose', event => {
  console.log('Service worker notificationclxose', event)
})
self.addEventListener('notificationclick', event => {
  console.log('Service worker notificationclick', event)
})
self.addEventListener('sync', event => {
  console.log('Service worker sync', event)
})

self.addEventListener('beforeinstallprompt', event => {
  console.log('Service worker beforeinstallprompt', event)
})

self.addEventListener('message', event => {
  console.log('Service worker received message', event)
})

self.addEventListener('push', event => {
  const data = event.data.json() // Assuming the server sends JSON data
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'icon.png'
  })
})

// In your main JavaScript file
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager.subscribe({ userVisibleOnly: true })
      .then(subscription => {
        console.log('User is subscribed to push notifications:', subscription)
        // Send the subscription object to your server
      })
      .catch(error => {
        console.error('Failed to subscribe to push notifications:', error)
      })
  })
}

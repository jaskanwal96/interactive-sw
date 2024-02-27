if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function(err) {
    // registration failed :(
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}


if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      // You can now send notifications!
    }
  })
}

document.getElementById('start-cache').addEventListener('click', () => {
  fetch('templates/todo-cache.html')
    .then(response => response.text())
    .then(html => {
      const questContainer = document.getElementById('quest-container')
      questContainer.innerHTML = html
      const template = questContainer.querySelector('#todo-cache-template')
      const clone = document.importNode(template.content, true)

      // Clear existing content and append the cloned template content
      questContainer.innerHTML = ''
      questContainer.appendChild(clone)
      // Dynamically load the quest's JavaScript
      const script = document.createElement('script')
      script.src = 'js/todo-cache.js'
      document.body.appendChild(script)
    })
})
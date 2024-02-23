
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')
const placeholder = document.getElementById('placeholder')
if (placeholder) placeholder.style.display = 'none'

// Load saved tasks from local storage
loadTasks()

input.addEventListener('keyup', event => {
  if (event.key === 'Enter' && input.value.trim() !== '') {
    addTask(input.value.trim())
    input.value = ''
  }
})

list.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked')
    saveTasks()
  }
})

function addTask(task) {
  const li = document.createElement('li')
  li.textContent = task
  list.appendChild(li)
  if (placeholder) placeholder.style.display = 'none'
  saveTasks()
}

function saveTasks() {
  const DATA_CACHE_NAME = 'todo-list-data-v1'
  const tasks = Array.from(list.children).map(li => ({
    text: li.textContent,
    checked: li.classList.contains('checked')
  }))
  caches.open(DATA_CACHE_NAME).then(cache => {
    return fetch('/api/todos')
      .then(response => {
      // eslint-disable-next-line no-debugger
        cache.put('/api/todos', new Response(JSON.stringify(tasks)))
        return response
      })
      .catch(() => cache.match(event.request))
  })
}

function loadTasks() {
  fetch('/api/todos')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        const li = document.createElement('li')
        li.textContent = task.text
        if (task.checked) {
          li.classList.add('checked')
        }
        list.appendChild(li)
      })
    })
    .catch(() => {
      placeholder.style.display = 'block'
    })
}

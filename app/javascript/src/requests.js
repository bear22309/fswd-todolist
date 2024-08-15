export const fetchTasks = () => {
  fetch('/api/tasks', {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  })
    .then(response => response.json())
    .then(data => {
      const tasksList = document.querySelector('#tasks-list');
      tasksList.innerHTML = '';
      data.tasks.forEach(task => {
        tasksList.innerHTML += `
          <li>
            <strong>${task.title}</strong>
            <p>${task.description}</p>
            <button class="mark-complete" data-task-id="${task.id}">Mark Complete</button>
            <button class="mark-active" data-task-id="${task.id}">Mark Active</button>
            <button class="delete-task" data-task-id="${task.id}">Delete</button>
          </li>
        `;
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
};

export const createTask = (title, description) => {
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify({ task: { title, description } }),
  })
    .then(response => response.json())
    .then(data => {
      fetchTasks();
    })
    .catch(error => console.error('Error creating task:', error));
};

export const updateTask = (taskId, updates) => {
  fetch(`/api/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify({ task: updates }),
  })
    .then(response => response.json())
    .then(data => {
      fetchTasks();
    })
    .catch(error => console.error('Error updating task:', error));
};

export const deleteTask = (taskId) => {
  fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  })
    .then(() => {
      fetchTasks();
    })
    .catch(error => console.error('Error deleting task:', error));
};

export const markTaskComplete = (taskId) => {
  updateTask(taskId, { completed: true });
};

export const markTaskActive = (taskId) => {
  updateTask(taskId, { completed: false });
};

import $ from 'jquery';

const apiBaseUrl = '/api';

export function createTask(title, description) {
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log('Creating task with API key:', apiKey); // Debugging line
  return fetch(`${apiBaseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Correctly passing the API key as Bearer token
    },
    body: JSON.stringify({ task: { title, description } })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export function fetchTasks() {
  const apiKey = process.env.REACT_APP_API_KEY;
  return fetch(`${apiBaseUrl}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Correctly passing the API key as Bearer token
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export function markTaskComplete(taskId) {
  const apiKey = process.env.REACT_APP_API_KEY;
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete`,
    type: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}` // Adding authorization header
    },
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task complete:', textStatus, errorThrown);
    throw new Error('Error marking task complete');
  });
}

export function markTaskActive(taskId) {
  const apiKey = process.env.REACT_APP_API_KEY;
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_active`,
    type: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}` // Adding authorization header
    },
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task active:', textStatus, errorThrown);
    throw new Error('Error marking task active');
  });
}

export function deleteTask(taskId) {
  const apiKey = process.env.REACT_APP_API_KEY;
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}`,
    type: 'DELETE',
    headers: {
      'Authorization': `Bearer ${apiKey}` // Adding authorization header
    },
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error deleting task:', textStatus, errorThrown);
    throw new Error('Error deleting task');
  });
}

// Event handler for DOM-ready
$(document).ready(() => {
  // Load tasks and render them in the DOM
  const loadTasks = () => {
    fetchTasks().then(tasks => {
      $('#tasks-list').empty();
      if (Array.isArray(tasks)) {
        tasks.forEach(task => {
          let taskItem = `
            <li id="task-${task.id}"${task.completed ? ' class="completed-task"' : ''}>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              ${task.completed ? 
                `<button class="mark-active" data-task-id="${task.id}">Mark Active</button>` :
                `<button class="mark-complete" data-task-id="${task.id}">Mark Complete</button>`}
              <button class="delete-task" data-task-id="${task.id}">Delete</button>
            </li>
          `;
          $('#tasks-list').append(taskItem);
        });
      } else {
        console.error('Expected an array of tasks but got:', tasks);
      }
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  };

  // Event handler for 'Mark Complete' button
  $('#tasks-list').on('click', '.mark-complete', function() {
    let taskId = $(this).data('task-id');
    markTaskComplete(taskId).then(() => {
      loadTasks(); // Refresh the task list after marking complete
    }).catch(error => {
      console.error('Error marking task complete:', error);
    });
  });

  // Event handler for 'Mark Active' button
  $('#tasks-list').on('click', '.mark-active', function() {
    let taskId = $(this).data('task-id');
    markTaskActive(taskId).then(() => {
      loadTasks(); // Refresh the task list after marking active
    }).catch(error => {
      console.error('Error marking task active:', error);
    });
  });

  // Event handler for 'Delete Task' button
  $('#tasks-list').on('click', '.delete-task', function() {
    let taskId = $(this).data('task-id');
    deleteTask(taskId).then(() => {
      loadTasks(); // Refresh the task list after deleting a task
    }).catch(error => {
      console.error('Error deleting task:', error);
    });
  });

  // Event handler for 'Create Task' button
  $('#create-task-button').on('click', () => {
    const title = $('#task-title').val();
    const description = $('#task-description').val();
    createTask(title, description).then(() => {
      loadTasks(); // Refresh the task list after creating a task
    }).catch(error => {
      console.error('Error creating task:', error);
    });
  });

  // Initial load of tasks
  loadTasks();
});
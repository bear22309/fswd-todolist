import $ from 'jquery';

const apiBaseUrl = '/api';
const apiKey = 1
const qs = `api_key=${apiKey}`

export function createTask(content) {
  return fetch(`${apiBaseUrl}/tasks?${qs}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task: { content } })
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export function fetchTasks() {
  return fetch(`${apiBaseUrl}/tasks?${qs}`, {
    headers: {
      'Content-Type': 'application/json',
       
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export function markTaskComplete(taskId) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete?${qs}`,
    type: 'PUT',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task complete:', textStatus, errorThrown);
    throw new Error('Error marking task complete');
  });
}

export function markTaskActive(taskId) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete?${qs}`,
    type: 'PUT',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task active:', textStatus, errorThrown);
    throw new Error('Error marking task active');
  });
}

export function deleteTask(taskId) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete?${qs}`,
    type: 'DELETE',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error deleting task:', textStatus, errorThrown);
    throw new Error('Error deleting task');
  });
}

$(document).ready(() => {
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
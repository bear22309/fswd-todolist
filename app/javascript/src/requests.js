import $ from 'jquery';

const apiBaseUrl = '/api';

// Fetch all tasks
export function fetchTasks(apiKey) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks?api_key=${apiKey}`,
    method: 'GET',
    dataType: 'json'
  }).then(response => {
    if (Array.isArray(response)) {
      return response;
    } else {
      console.error('Expected an array but received:', response);
      return [];
    }
  }).catch(error => {
    console.error('Error fetching tasks:', error);
    return [];
  });
}

// Create a new task
export function createTask(title, description, apiKey) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks?api_key=${apiKey}`,
    method: 'POST',
    dataType: 'json',
    data: {
      task: {
        title: title,
        description: description
      }
    }
  }).catch(error => {
    console.error('Error creating task:', error);
  });
}

// Mark a task as complete
export function markTaskComplete(taskId, apiKey) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete?api_key=${apiKey}`,
    type: 'PUT',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task complete:', textStatus, errorThrown);
    throw new Error('Error marking task complete');
  });
}

// Mark a task as active
export function markTaskActive(taskId, apiKey) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_active?api_key=${apiKey}`,
    type: 'PUT',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task active:', textStatus, errorThrown);
    throw new Error('Error marking task active');
  });
}

// Delete a task
export function deleteTask(taskId, apiKey) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}?api_key=${apiKey}`,
    type: 'DELETE',
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
    fetchTasks(window.env.API_KEY).then(tasks => {
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
    markTaskComplete(taskId, window.env.API_KEY).then(() => {
      loadTasks(); // Refresh the task list after marking complete
    }).catch(error => {
      console.error('Error marking task complete:', error);
    });
  });

  // Event handler for 'Mark Active' button
  $('#tasks-list').on('click', '.mark-active', function() {
    let taskId = $(this).data('task-id');
    markTaskActive(taskId, window.env.API_KEY).then(() => {
      loadTasks(); // Refresh the task list after marking active
    }).catch(error => {
      console.error('Error marking task active:', error);
    });
  });

  // Event handler for 'Delete Task' button
  $('#tasks-list').on('click', '.delete-task', function() {
    let taskId = $(this).data('task-id');
    deleteTask(taskId, window.env.API_KEY).then(() => {
      loadTasks(); // Refresh the task list after deleting a task
    }).catch(error => {
      console.error('Error deleting task:', error);
    });
  });

  // Event handler for 'Create Task' button
  $('#create-task-button').on('click', () => {
    const title = $('#task-title').val();
    const description = $('#task-description').val();
    createTask(title, description, window.env.API_KEY).then(() => {
      loadTasks(); // Refresh the task list after creating a task
    }).catch(error => {
      console.error('Error creating task:', error);
    });
  });

  // Initial load of tasks
  loadTasks();
});

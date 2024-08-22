import $ from 'jquery';

const apiBaseUrl = '/api';

// Fetch all tasks
export const fetchTasks = (apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks`,
    type: 'GET',
    data: { api_key: apiKey },
    dataType: 'json'
  });
};

// Create a new task
export const createTask = (title, description, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks`,
    type: 'POST',
    data: { task: { title, description }, api_key: apiKey },
    dataType: 'json'
  });
};

// Mark a task as complete
export const markTaskComplete = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete`,
    type: 'PUT', 
    data: { api_key: apiKey },
    dataType: 'json'
  });
};

// Mark a task as active
export const markTaskActive = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_active`,
    type: 'PUT', 
    data: { api_key: apiKey },
    dataType: 'json'
  });
};

// Delete a task
export const deleteTask = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}`,
    type: 'DELETE',
    data: { api_key: apiKey },
    dataType: 'json'
  });
};

// Event handler for 'Mark Complete' button
$('#tasks-list').on('click', '.mark-complete', function() {
  const taskId = $(this).data('task-id');
  markTaskComplete(taskId, window.env.API_KEY).then(() => {
    loadTasks(); // Refresh the task list after marking complete
  }).catch(error => {
    console.error('Error marking task complete:', error);
  });
});

// Event handler for 'Mark Active' button
$('#tasks-list').on('click', '.mark-active', function() {
  const taskId = $(this).data('task-id');
  markTaskActive(taskId, window.env.API_KEY).then(() => {
    loadTasks(); // Refresh the task list after marking active
  }).catch(error => {
    console.error('Error marking task active:', error);
  });
});

export const loadTasks = () => {
  fetchTasks(window.env.API_KEY).then(tasks => {
    $('#tasks-list').empty();
    if (Array.isArray(tasks)) {
      tasks.forEach(task => {
        let taskItem = `
          <li${task.completed ? ' class="completed-task"' : ''}>
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
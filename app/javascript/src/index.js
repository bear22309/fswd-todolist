import $ from 'jquery';
import { fetchTasks, createTask, markTaskComplete, markTaskActive, deleteTask } from '../src/requests.js';

$(document).ready(function() {
  const apiKey = window.env.API_KEY; // Access API key from the global window object

  function loadTasks() {
    fetchTasks(apiKey).then(tasks => {
      $('#tasks-list').empty();
      if (Array.isArray(tasks)) {
        tasks.forEach(task => {
          let taskItem = `
            <li>
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <button class="delete-task" data-task-id="${task.id}">Delete</button>
              ${task.completed ? 
                `<button class="mark-active" data-task-id="${task.id}">Mark Active</button>` :
                `<button class="mark-complete" data-task-id="${task.id}">Mark Complete</button>`}
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
  }

  loadTasks();

  $('#addTaskButton').click(function() {
    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    if (title && description) {
      createTask(title, description, apiKey).then(() => {
        $('#taskTitle').val('');
        $('#taskDescription').val('');
        loadTasks();
      }).catch(error => {
        console.error('Error creating task:', error);
      });
    } else {
      alert('Please enter both a title and description');
    }
  });

  $('#tasks-list').on('click', '.mark-complete', function() {
    const taskId = $(this).data('task-id');
    markTaskComplete(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task complete:', error);
    });
  });

  $('#tasks-list').on('click', '.mark-active', function() {
    const taskId = $(this).data('task-id');
    markTaskActive(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task active:', error);
    });
  });

  $('#tasks-list').on('click', '.delete-task', function() {
    const taskId = $(this).data('task-id');
    deleteTask(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error deleting task:', error);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const newTaskForm = document.querySelector('#new-task-form');
  newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#new-task-title').value;
    const description = document.querySelector('#new-task-description').value;
    createTask(title, description, window.env.API_KEY).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error creating task:', error);
    });
  });

  const tasksList = document.querySelector('#tasks-list');
  tasksList.addEventListener('click', (event) => {
    const taskId = event.target.dataset.taskId;
    if (event.target.classList.contains('delete-task')) {
      deleteTask(taskId, window.env.API_KEY).then(() => {
        loadTasks();
      }).catch(error => {
        console.error('Error deleting task:', error);
      });
    } else if (event.target.classList.contains('mark-complete')) {
      markTaskComplete(taskId, window.env.API_KEY).then(() => {
        loadTasks();
      }).catch(error => {
        console.error('Error marking task complete:', error);
      });
    } else if (event.target.classList.contains('mark-active')) {
      markTaskActive(taskId, window.env.API_KEY).then(() => {
        loadTasks();
      }).catch(error => {
        console.error('Error marking task active:', error);
      });
    }
  });
});

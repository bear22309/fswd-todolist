import $ from 'jquery';
import { fetchTasks, createTask, markTaskComplete, markTaskActive, deleteTask } from '../src/requests.js';

$(document).ready(function() {
  const apiKey = 'apiKey'; 

  function loadTasks() {
    fetchTasks(apiKey).then(tasks => {
      $('#tasks-list').empty();
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
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }

  loadTasks();

  $('#addTaskButton').click(function() {
    var title = $('#taskTitle').val();
    var description = $('#taskDescription').val();
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
    var taskId = $(this).data('task-id');
    markTaskComplete(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task complete:', error);
    });
  });

  $('#tasks-list').on('click', '.mark-active', function() {
    var taskId = $(this).data('task-id');
    markTaskActive(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task active:', error);
    });
  });

  $('#tasks-list').on('click', '.delete-task', function() {
    var taskId = $(this).data('task-id');
    deleteTask(taskId, apiKey).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error deleting task:', error);
    });
  });
});
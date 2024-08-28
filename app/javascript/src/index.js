import $ from 'jquery';
import { fetchTasks, createTask, markTaskComplete, markTaskActive, deleteTask } from '../src/requests.js';

$(document).ready(function() {
  const apiKey = window.env.API_KEY;

  function loadTasks() {
    fetchTasks(apiKey).then(tasks => {
      $('#tasks-list').empty();
      if (Array.isArray(tasks)) {
        tasks.forEach(task => {
          let taskItem = `
            <li id="task-${task.id}">
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
        alert('Error loading tasks.');
      }
    }).catch(error => {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks. Please try again.');
    });
  }

  loadTasks();

  $('#addTaskButton').click(function() {
    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    if (title && description) {
      createTask(title, description, apiKey).then(newTask => {
        $('#taskTitle').val('');
        $('#taskDescription').val('');
        const taskItem = `
          <li id="task-${newTask.id}">
            <h3>${newTask.title}</h3>
            <p>${newTask.description}</p>
            <button class="delete-task" data-task-id="${newTask.id}">Delete</button>
            <button class="mark-complete" data-task-id="${newTask.id}">Mark Complete</button>
          </li>
        `;
        $('#tasks-list').append(taskItem);
      }).catch(error => {
        console.error('Error creating task:', error);
        alert('Error creating task. Please try again.');
      });
    } else {
      alert('Please enter both a title and description.');
    }
  });
  

  $('#tasks-list').on('click', '.mark-active', function() {
    const taskId = $(this).data('task-id');
    $(this).replaceWith(`<button class="mark-complete" data-task-id="${taskId}">Mark Complete</button>`);
    markTaskActive(taskId, apiKey).catch(error => {
      console.error('Error marking task active:', error);
      alert('Error marking task active. Please try again.');
      $(`#task-${taskId} .mark-complete`).replaceWith(`<button class="mark-active" data-task-id="${taskId}">Mark Active</button>`);
    });
  });

  $('#tasks-list').on('click', '.delete-task', function() {
    const taskId = $(this).data('task-id');
    $(`#task-${taskId}`).remove();
    deleteTask(taskId, apiKey).catch(error => {
      console.error('Error deleting task:', error);
      alert('Error deleting task. Please try again.');
      loadTasks(); // Reload the tasks list in case of failure to restore the task
    });
  });
});

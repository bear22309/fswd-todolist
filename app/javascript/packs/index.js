// packs/index.js
import { fetchTasks, createTask, markTaskComplete, markTaskActive, deleteTask } from '../src/requests.js';

$(document).ready(function() {
  function loadTasks() {
    fetchTasks().then(tasks => {
      $('#tasks-list').empty();
      if (Array.isArray(tasks)) {
        tasks.forEach(task => {
          let taskItem = `
            <li id="task-${task.id}">
              <h3>${task.content}</h3>
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
    const content = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    if (content) {
      createTask(content).then(() => {
        loadTasks();
        $('#taskTitle').val("")
      }).catch(error => {
        console.error('Error creating task:', error);
        alert('Error creating task. Please try again.');
      });
    } else {
      alert('Please enter both a task.');
    }
  });

  $('#tasks-list').on('click', '.mark-complete', function() {
    const taskId = $(this).data('task-id');
    markTaskComplete(taskId).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task complete:', error);
    });
  });

  $('#tasks-list').on('click', '.mark-active', function() {
    const taskId = $(this).data('task-id');
    markTaskActive(taskId).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error marking task active:', error);
    });
  });

  $('#tasks-list').on('click', '.delete-task', function() {
    const taskId = $(this).data('task-id');
    $(`#task-${taskId}`).remove();
    deleteTask(taskId).then(() => {
      loadTasks();
    }).catch(error => {
      console.error('Error deleting task:', error);
      
    });
  });
});
import $ from 'jquery';
import { fetchTasks, createTask, markTaskComplete, markTaskActive, deleteTask } from './requests.js';

$(document).ready(function() {
  // Function to fetch and display tasks
  function loadTasks() {
    fetchTasks();
  }

  // Initial fetch of tasks
  loadTasks();

  // Event handler for adding a new task
  $('#addTaskButton').click(function() {
    var title = $('#taskTitle').val();
    var description = $('#taskDescription').val();
    if (title && description) {
      createTask(title, description);
      $('#taskTitle').val(''); // Clear input field
      $('#taskDescription').val(''); // Clear input field
      loadTasks(); // Reload tasks after creation
    } else {
      alert('Please enter both a title and description');
    }
  });

  // Event delegation for marking a task as complete
  $('#tasks-list').on('click', '.mark-complete', function() {
    var taskId = $(this).data('task-id');
    markTaskComplete(taskId);
    loadTasks(); // Reload tasks after marking as complete
  });

  // Event delegation for marking a task as active
  $('#tasks-list').on('click', '.mark-active', function() {
    var taskId = $(this).data('task-id');
    markTaskActive(taskId);
    loadTasks(); // Reload tasks after marking as active
  });

  // Event delegation for deleting a task
  $('#tasks-list').on('click', '.delete-task', function() {
    var taskId = $(this).data('task-id');
    deleteTask(taskId);
    loadTasks(); // Reload tasks after deletion
  });
});

import { fetchTasks, createTask, updateTask, deleteTask, markTaskComplete, markTaskActive } from '../src/requests.js';

window.onload = function() {
  fetchTasks();

  document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.querySelector('#new-task-form');
    newTaskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.querySelector('#new-task-title').value;
      const description = document.querySelector('#new-task-description').value;
      createTask(title, description);
    });

    const tasksList = document.querySelector('#tasks-list');
    tasksList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const taskId = event.target.dataset.taskId;
        deleteTask(taskId);
      } else if (event.target.classList.contains('mark-complete')) {
        const taskId = event.target.dataset.taskId;
        markTaskComplete(taskId);
      } else if (event.target.classList.contains('mark-active')) {
        const taskId = event.target.dataset.taskId;
        markTaskActive(taskId);
      }
    });
  });
};
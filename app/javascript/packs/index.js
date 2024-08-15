import { fetchTasks, createTask, updateTask, deleteTask, markTaskComplete, markTaskActive } from './requests';

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();

  document.querySelector('#new-task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#new-task-title').value;
    const description = document.querySelector('#new-task-description').value;
    createTask(title, description);
  });

  document.querySelector('#tasks-list').addEventListener('click', (event) => {
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

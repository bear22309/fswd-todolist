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
    url: `${apiBaseUrl}/tasks/${taskId}/mark_active?${qs}`,
    type: 'PUT',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error marking task active:', textStatus, errorThrown);
    throw new Error('Error marking task active');
  });
}

export function deleteTask(taskId) {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}?${qs}`,
    type: 'DELETE',
    dataType: 'json'
  }).fail((jqXHR, textStatus, errorThrown) => {
    console.error('Error deleting task:', textStatus, errorThrown);
    throw new Error('Error deleting task');
  });
}
import $ from 'jquery';

const apiBaseUrl = '/api';


export const fetchTasks = (apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks`,
    type: 'GET',
    data: { api_key: apiKey }, // Send API key here
    dataType: 'json'
  });
};

export const createTask = (title, description, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks`,
    type: 'POST',
    data: { task: { title, description }, api_key: apiKey }, // API key and task data
    dataType: 'json'
  });
};

export const markTaskComplete = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_complete`,  
    type: 'PUT',
    data: { api_key: apiKey }, // API key
    dataType: 'json'
  });
};


export const markTaskActive = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}/mark_active`,
    type: 'PUT',
    data: { api_key: apiKey }, // API key
    dataType: 'json'
  });
};

export const deleteTask = (taskId, apiKey) => {
  return $.ajax({
    url: `${apiBaseUrl}/tasks/${taskId}`,
    type: 'DELETE',
    data: { api_key: apiKey }, // API key
    dataType: 'json'
  });
};

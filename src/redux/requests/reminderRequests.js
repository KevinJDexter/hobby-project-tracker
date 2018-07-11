import axios from 'axios';

export function callProjectReminders(projectId) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`/api/reminder/${projectId}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callPostReminder(payload) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/reminder', payload, config)
    .then(response => response)
    .catch(error => { throw error.response || error; });
}

export function callEditReminder(action) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/reminder/${action.id}`, action.payload, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}

export function callDeleteReminder(id) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/reminder/${id}`, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}
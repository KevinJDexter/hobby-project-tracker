import axios from 'axios';

export function callAllProjects() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/project/all', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callPostProject(payload) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/project', payload, config)
    .then(response => response.data[0].id)
    .catch(error => { throw error.response || error; });
}

export function callEditProject(action) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/project/${action.id}`, action.payload, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}

export function callDeleteProject(id) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/project/${id}`, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}
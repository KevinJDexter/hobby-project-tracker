import axios from 'axios';

export function callAllTechnologies() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/technology/all', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callProjectTechnologies(projectId) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`'/api/technology/${projectId}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callPostTechnology(payload) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/technology', payload, config)
    .then(response => response.data)
    .catch(error => { throw error.response || error; });
}

export function callEditTechnology(action) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.put(`/api/technology/${action.id}`, action.payload, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}

export function callDeleteTechnology(id) {
  const config = {
    headers: {'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/technology/${id}`, config)
    .then(response => response)
    .catch(error => {throw error.response || error; });
}
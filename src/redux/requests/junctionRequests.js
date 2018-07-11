export function callPostPT (payload) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.post('/api/junction/projectTechnology', payload, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

export function callDeletePTByProject (id) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.delete(`/api/junction/projectTechnology/project/${id}`, config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}
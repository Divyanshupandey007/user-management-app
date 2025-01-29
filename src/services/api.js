import axios from 'axios';

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = () => API.get('/users');
export const createUser = (user) => API.post('/users', user);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (id, user) => {
  if (id > 10) {
    return Promise.reject(new Error('User not found'));
  }
  return API.put(`/users/${id}`, user);
};
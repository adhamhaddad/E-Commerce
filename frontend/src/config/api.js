import axios from 'axios';
import { API_URL } from './env';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  }
});

api.defaults.withCredentials = true; // Set withCredentials to true

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (refreshToken) {
    config.headers['X-Refresh-Token'] = `Bearer ${refreshToken}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;

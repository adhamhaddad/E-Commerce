import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './env';

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
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default api;

// Configures the shared Axios client for backend API communication.
import axios from 'axios';
import environment from '../config/environment.js';

const api = axios.create({
  baseURL: environment.apiBaseUrl,
  withCredentials: true
});

export default api;

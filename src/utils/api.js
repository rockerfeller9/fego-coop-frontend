import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'; // Corrected base URL assignment
const api = axios.create({ baseURL });

// Add a request interceptor to add the token to all requests
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('fegoToken');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`; // Add token to headers
  }
  return cfg;
});

export default api;
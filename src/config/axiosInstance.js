import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('fegoToken');
  if (token) {
    cfg.headers['x-auth-token'] = token; // Changed from Authorization to x-auth-token
    cfg.headers.Authorization = `Bearer ${token}`; // Keep both for compatibility
  }
  return cfg;
});

export default axiosInstance;
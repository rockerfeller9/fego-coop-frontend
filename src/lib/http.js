import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const http = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('fegoToken');
  if (token) {
    cfg.headers['x-auth-token'] = token;
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});
import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API = axios.create({
  baseURL: isLocal ? 'http://localhost:5000/api' : 'https://ai-recruiter-backend-sfbf.onrender.com/api',
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add auth token here if needed in future
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;

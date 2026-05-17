import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ai-recruiter-backend-sfbf.onrender.com',
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

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('janvaani_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling could go here (e.g., logging out on 401)
    console.error('API Client Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

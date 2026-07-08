import apiClient from './apiClient';

export const healthService = {
  checkBackend: async () => {
    try {
      // The health route is at the root of the server, not under /api/v1
      // We can override the baseURL for this specific call or fetch it directly.
      // Easiest way is to replace /api/v1 with /health based on the baseURL.
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
      const rootUrl = baseUrl.replace('/api/v1', '');
      
      const response = await apiClient.get(`${rootUrl}/health`, {
        baseURL: rootUrl // Override for this request
      });
      return response.data;
    } catch (error) {
      console.error("Backend health check failed:", error);
      throw error;
    }
  }
};

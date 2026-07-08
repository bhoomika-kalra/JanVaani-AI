import apiClient from './apiClient';

export const reportService = {
  generateMonthlyReport: async () => {
    try {
      const response = await apiClient.post('/reports/monthly');
      return response.data;
    } catch (error) {
      console.warn("Failed to generate monthly report", error);
      throw new Error("Report generation service is currently unavailable.");
    }
  },
  
  downloadComplaintsCSV: async () => {
    try {
      // In a real implementation this might trigger a file download using Blob
      const response = await apiClient.get('/reports/complaints-csv', { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.warn("Failed to download CSV", error);
      throw new Error("Report download service is currently unavailable.");
    }
  }
};

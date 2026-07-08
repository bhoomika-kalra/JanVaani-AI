import apiClient from './apiClient';

export const feedbackService = {
  getFeedback: async () => {
    try {
      const response = await apiClient.get('/mp/feedback');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch MP feedback", error);
      return [
        { id: 1, name: 'Rahul S.', location: 'Ward 14', category: 'Water', rating: 4, comment: 'Pipeline issue resolved quickly.', sentiment: 'positive' },
        { id: 2, name: 'Priya M.', location: 'Ward 22', category: 'Roads', rating: 2, comment: 'Potholes only partially filled.', sentiment: 'negative' }
      ];
    }
  },
  
  getFeedbackSummary: async () => {
    try {
      const response = await apiClient.get('/mp/feedback/summary');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch MP feedback summary", error);
      return {
        positive: 65,
        neutral: 20,
        negative: 15,
        unresolvedCount: 3
      };
    }
  }
};

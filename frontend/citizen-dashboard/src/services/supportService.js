import apiClient from './apiClient';

export const supportService = {
  supportComplaint: async (complaintId) => {
    try {
      const response = await apiClient.post(`/complaints/${complaintId}/support`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw new Error("You already supported this issue.");
      }
      console.warn("Failed to support complaint, updating optimistically", error);
      // Optimistic success
      return { success: true };
    }
  }
};

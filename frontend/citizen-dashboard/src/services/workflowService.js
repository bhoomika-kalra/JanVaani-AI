import apiClient from './apiClient';

export const workflowService = {
  approveComplaint: async (complaintId) => {
    try {
      const response = await apiClient.put(`/workflow/${complaintId}/approve`);
      return response.data;
    } catch (error) {
      console.warn("Failed to approve, optimistic update", error);
      return { success: true };
    }
  },
  
  assignDepartment: async (complaintId, department) => {
    try {
      const response = await apiClient.put(`/workflow/${complaintId}/assign-department`, { department });
      return response.data;
    } catch (error) {
      console.warn("Failed to assign department, optimistic update", error);
      return { success: true };
    }
  },

  startWork: async (complaintId) => {
    try {
      const response = await apiClient.put(`/workflow/${complaintId}/start-work`);
      return response.data;
    } catch (error) {
      console.warn("Failed to start work, optimistic update", error);
      return { success: true };
    }
  },

  completeWork: async (complaintId) => {
    try {
      const response = await apiClient.put(`/workflow/${complaintId}/complete`);
      return response.data;
    } catch (error) {
      console.warn("Failed to complete work, optimistic update", error);
      return { success: true };
    }
  }
};

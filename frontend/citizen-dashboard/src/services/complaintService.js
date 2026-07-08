import apiClient from './apiClient';

export const complaintService = {
  createComplaint: async (payload) => {
    // Map category string to department_id for backend
    const deptMap = {
      "Electricity": 1,
      "Water": 2,
      "Roads": 3,
      "Sanitation": 4,
      "Security": 5
    };
    
    // Default to 99 for unknown
    const department_id = deptMap[payload.category] || 99;
    
    // Build the exact schema expected by ComplaintCreate
    const formattedPayload = {
      title: payload.title,
      description: payload.description,
      department_id: department_id,
      location_lat: payload.latitude || null,
      location_lng: payload.longitude || null,
      address: `${payload.city_or_village || ''}, ${payload.state || ''} ${payload.pincode || ''}`.trim()
    };
    
    const response = await apiClient.post('/complaints/', formattedPayload);
    return response.data;
  },

  getComplaint: async (complaintId) => {
    const response = await apiClient.get(`/complaints/${complaintId}`);
    return response.data;
  },

  getComplaintTracking: async (complaintId) => {
    const response = await apiClient.get(`/complaints/${complaintId}/tracking`);
    return response.data;
  },

  getMyComplaints: async () => {
    const response = await apiClient.get('/complaints/citizen/me');
    return response.data;
  },

  getNearbyComplaints: async () => {
    const response = await apiClient.get('/complaints/nearby/');
    return response.data;
  },

  supportComplaint: async (complaintId) => {
    const response = await apiClient.post(`/complaints/${complaintId}/support`);
    return response.data;
  }
};

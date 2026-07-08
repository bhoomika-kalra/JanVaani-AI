import apiClient from './apiClient';

export const citizenService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/citizens/profile');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch citizen profile, using fallback", error);
      return {
        full_name: "Demo Citizen",
        state: "Rajasthan",
        city_or_village: "Kota",
        pincode: "324005",
        latitude: 25.18,
        longitude: 75.83,
        preferred_language: "English"
      };
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await apiClient.put('/citizens/profile', data);
      return response.data;
    } catch (error) {
      console.warn("Failed to update profile, updating local state only", error);
      return data;
    }
  },

  getMyComplaints: async () => {
    try {
      const response = await apiClient.get('/citizens/complaints');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch my complaints", error);
      // Fallback
      return [];
    }
  },

  getSupportedIssues: async () => {
    try {
      const response = await apiClient.get('/citizens/supported-issues');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch supported issues", error);
      return [];
    }
  }
};

import apiClient from './apiClient';

export const mpService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/mp/profile');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch MP profile, using fallback", error);
      return {
        name: "Om Birla",
        role: "MP",
        state: "Rajasthan",
        constituency: "Kota",
        email: "om.birla@sansad.nic.in"
      };
    }
  }
};

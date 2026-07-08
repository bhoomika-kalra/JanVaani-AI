import apiClient from './apiClient';

export const communityService = {
  getNearbyComplaints: async (params) => {
    try {
      // params can include state, city_or_village, pincode, lat, lon
      const response = await apiClient.get('/complaints/nearby', { params });
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch nearby complaints", error);
      // Fallback
      return [
        {
          id: "JV-2026-FALLBACK1",
          title: "Broken Streetlight near Main Market",
          category: "Electricity",
          city_or_village: "Rampura Village",
          distance: "0.2 km",
          status: "Open",
          priority_score: 85,
          aiPriority: "High",
          statusColor: "bg-red-100 text-red-700",
          iconBg: "bg-orange-100 text-orange-600",
          supporters: 12,
          isSupported: false,
          image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&q=80"
        },
        {
          id: "JV-2026-FALLBACK2",
          title: "Water Supply Disrupted",
          category: "Water",
          city_or_village: "Rampura Village",
          distance: "0.5 km",
          status: "In Progress",
          priority_score: 65,
          aiPriority: "Medium",
          statusColor: "bg-yellow-100 text-yellow-700",
          iconBg: "bg-blue-100 text-blue-600",
          supporters: 8,
          isSupported: true,
          image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&q=80"
        }
      ];
    }
  },

  getLiveUpdates: async (city_or_village) => {
    try {
      const response = await apiClient.get('/transparency/completed', { params: { city_or_village } });
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch live updates", error);
      // Fallback
      return [
        {
          id: "UPD-1",
          title: "Road Repair Completed",
          category: "Roads",
          status: "Completed",
          date: "Just Now",
          description: `Potholes filled on Main Market road in ${city_or_village || 'your area'}.`
        },
        {
          id: "UPD-2",
          title: "New Pipeline Approved",
          category: "Water",
          status: "Approved",
          date: "2 hours ago",
          description: `Budget sanctioned for new water pipeline in ${city_or_village || 'your area'}.`
        }
      ];
    }
  }
};

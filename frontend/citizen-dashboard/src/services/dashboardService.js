import apiClient from './apiClient';

export const dashboardService = {
  getOverview: async () => {
    try {
      const response = await apiClient.get('/mp/dashboard/overview');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch overview, using fallback", error);
      return {
        totalComplaints: 1248,
        activeIssues: 342,
        aiRecommended: 12,
        highPriority: 45,
        completedWorks: 890,
        citizenParticipation: '8.4k'
      };
    }
  },

  getPriorityQueue: async () => {
    try {
      const response = await apiClient.get('/mp/dashboard/priority-queue');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch priority queue", error);
      return [
        { id: 'AI-774', title: 'Severe Waterlogging', ward: 'Ward 14', category: 'Drainage', priority: 98, estBudget: '₹4.5L', status: 'Pending Review' },
        { id: 'AI-775', title: 'Hostel Safety Audit', ward: 'Ward 22', category: 'Security', priority: 95, estBudget: '₹2.1L', status: 'Pending Review' },
        { id: 'AI-776', title: 'Chambal Bridge Repair', ward: 'Ward 08', category: 'Infrastructure', priority: 92, estBudget: '₹12.5L', status: 'Approved' },
        { id: 'AI-777', title: 'Power Cuts (48hr+)', ward: 'Ward 19', category: 'Electricity', priority: 89, estBudget: '₹1.0L', status: 'Assigned' },
        { id: 'AI-778', title: 'Toxic Waste Dump', ward: 'Ward 03', category: 'Sanitation', priority: 85, estBudget: '₹8.0L', status: 'Pending Review' },
      ];
    }
  },

  getHotspots: async () => {
    try {
      const response = await apiClient.get('/mp/dashboard/hotspots');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch hotspots", error);
      return [];
    }
  },

  getCategoryAnalytics: async () => {
    try {
      const response = await apiClient.get('/mp/dashboard/category-analytics');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch category analytics", error);
      return {
        series: [44, 55, 13, 43, 22],
        labels: ['Water', 'Roads', 'Electricity', 'Sanitation', 'Security']
      };
    }
  },
  
  getTransparencyOverview: async () => {
    try {
      const response = await apiClient.get('/transparency/overview');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch transparency overview", error);
      return {
        issuesReported: 1248,
        approvedProjects: 24,
        ongoingWorks: 12,
        completedWorks: 890,
        citizensBenefited: '12.5k'
      };
    }
  }
};

// Mock map data service for future backend integration

export const getCitizenLocation = async () => {
  return [25.18, 75.83]; // Default to Kota center
};

export const getNearbyCommunityIssues = async (location) => {
  return [
    { 
      id: 1, 
      title: 'Severe Waterlogging', 
      category: 'Water', 
      status: 'In Progress', 
      priority_score: 98, 
      latitude: 25.185, 
      longitude: 75.838, 
      supporters: 243, 
      city_or_village: 'Rampura Village', 
      distance: 1.2, 
      citizens_affected: 4500 
    },
    { 
      id: 2, 
      title: 'Transformer Sparking', 
      category: 'Electricity', 
      status: 'Under Review', 
      priority_score: 82, 
      latitude: 25.172, 
      longitude: 75.825, 
      supporters: 189, 
      city_or_village: 'Rampura Village', 
      distance: 2.1, 
      citizens_affected: 2100 
    },
    { 
      id: 3, 
      title: 'Garbage Dump Overflow', 
      category: 'Sanitation', 
      status: 'Completed', 
      priority_score: 35, 
      latitude: 25.190, 
      longitude: 75.815, 
      supporters: 156, 
      city_or_village: 'Rampura Village', 
      distance: 3.5, 
      citizens_affected: 850 
    },
  ];
};

export const getComplaintMarkers = async (filters) => {
  // Placeholder for broader query
  return [];
};

export const getMPHotspots = async (constituency) => {
  return [
    { 
      id: 1, 
      title: 'Waterlogging', 
      category: 'Water', 
      status: 'Critical', 
      priority_score: 98, 
      latitude: 25.185, 
      longitude: 75.835, 
      supporters: 145, 
      ward: 'Ward 14 (Downtown)',
      city_or_village: 'Kota', 
      distance: 0, 
      citizens_affected: 4500 
    },
    { 
      id: 2, 
      title: 'Electricity', 
      category: 'Electricity', 
      status: 'Monitor', 
      priority_score: 82, 
      latitude: 25.170, 
      longitude: 75.820, 
      supporters: 89, 
      ward: 'Ward 22 (North Hub)',
      city_or_village: 'Kota', 
      distance: 0, 
      citizens_affected: 2100 
    },
    { 
      id: 3, 
      title: 'Roads', 
      category: 'Road', 
      status: 'Resolved', 
      priority_score: 35, 
      latitude: 25.195, 
      longitude: 75.850, 
      supporters: 45, 
      ward: 'Ward 08 (East Side)',
      city_or_village: 'Kota', 
      distance: 0, 
      citizens_affected: 850 
    },
  ];
};

export const getWardMapData = async (constituency) => {
  // Placeholder for future boundaries data
  return [];
};

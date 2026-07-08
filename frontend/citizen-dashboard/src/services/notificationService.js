import apiClient from './apiClient';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await apiClient.get('/notifications');
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch notifications, using fallback", error);
      return [
        { id: 1, title: 'Complaint Registered', message: 'Your complaint CMP-101 has been registered.', time: 'Just now', read: false },
        { id: 2, title: 'AI Analysis Complete', message: 'AI has analyzed CMP-101 and assigned High Priority.', time: '2m ago', read: false }
      ];
    }
  },
  
  markAsRead: async (id) => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
      return { success: true };
    } catch (error) {
      console.warn("Failed to mark notification as read", error);
      return { success: true };
    }
  }
};

import apiClient from './apiClient';

export const mediaService = {
  uploadMedia: async (complaintId, file, type, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // type should be 'image', 'audio', or 'video'
    const endpoint = `/complaints/${complaintId}/media/${type}`;
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      }
    };
    
    const response = await apiClient.post(endpoint, formData, config);
    return response.data;
  }
};

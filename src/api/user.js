import api from '@/api/axios';

export const userService = {

  // Отримання профілю (поточний)
  getProfile: async () => {
    const response = await api.get('/api/users/me');
    return response.data;
  },
  
  // Отримання профілю (публічний)
  getPublicProfile: async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  // Зміна даних профілю (Ім'я, Прізвище, Опис)
  updateProfile: async (userData) => {
    const response = await api.patch('/api/users/profile', userData);
    return response.data;
  },

  // Зміна налаштувань (тема, мова)
  updateSettings: async (settings) => {
    const response = await api.put('/api/users/settings', settings);
    return response.data;
  },

  // Зміна аватару
  uploadAvatar: async (formData) => {
    const response = await api.post('/api/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Зміна паролю
  changePassword: async (passwordData) => {
    const response = await api.post('/api/users/password', passwordData);
    return response.data;
  },

  //Отримати останній запит на адмінку
  getAdminRequest: async () => {
    const response = await api.get('/api/users/my-admin-request');
    return response.data;
  },

  //Надіслати запит на адмінку
  postAdminRequest: async (reason) => {
    const response = await api.post('/api/users/my-admin-request', { reason });
    return response.data;
  },

  //Помітити як прочитане
  archiveAdminRequest: async (id) => {
    const response = await api.patch('/api/users/my-admin-request', {id});
    return response.data;
  },

  getAllRequest: async () => {
    const response = await api.get('/api/users/admin-request');
    return response.data;
  },

  setRequestStatus: async (id, status) => {
    const response = await api.post(`/api/users/admin-request/${id}`, status)
    return response.data
  }
};
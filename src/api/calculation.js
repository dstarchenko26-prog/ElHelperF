import api from "./axios";

export const calculationService = {
  
  testCalculation: async (data) => {
    const response = await api.post('/api/calculations/test', data);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/api/calculations', data);
    return response.data;
  },

  getById: async (calcId) => {
    const response = await api.get(`/api/calculations/calc/${calcId}`);
    return response.data;
  },

  getByProject: async (projectId) => {
    const response = await api.get(`/api/calculations/${projectId}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/api/calculations/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/calculations/${id}`);
    return response.data
  }
};
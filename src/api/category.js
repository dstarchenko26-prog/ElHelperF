import api from "@/api/axios";

export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/api/categories')
    return response.data
  }, 

  createCategory: async (data) => {
    const response = await api.post('/api/categories', data)
    return response.data
  }
};
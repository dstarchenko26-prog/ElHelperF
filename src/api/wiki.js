import api from "@/api/axios";

export const wikiService = {
  getArticles: async (filters) => {
    const response = await api.get('/api/theory/search', {
      params: {
        query: filters.query || undefined,
        categoryId: filters.categoryId || undefined, 
        sort: filters.sort || 'newest',
        lang: filters.lang || 'uk'
      }
    });
    return response.data;
  },

  getArticlesAdmin: async() => {
    const response = await api.get('/api/theory/byAdmin')
    return response.data
  },

  getArticleById: async(id) => {
    const response = await api.get(`/api/theory/${id}`)
    return response.data
  },

  createArticle: async(payload) => {
    const response = await api.post('/api/theory/create', payload )
    return response.data
  },

  updateArticle: async(id, payload) => {
    const response = await api.patch(`/api/theory/update/${id}`, payload )
    return response.data
  },

  deleteArticle: async(id) => {
    const response = await api.delete(`/api/theory/delete/${id}`)
    return response.data
  }
};
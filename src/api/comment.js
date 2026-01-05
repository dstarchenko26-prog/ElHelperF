import api from "./axios";

export const commentService = {
  getComments: async (id) => {
    const response = await api.get(`/api/comments/article/${id}`)
    return response.data;
  },

  postComment: async (comment) => {
    const response = await api.post('/api/comments', comment)
    return response.data
  },

  deleteComment: async (id) => {
    const response = await api.delete(`/api/comments/${id}`)
    return response.data
  }
}
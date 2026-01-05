import api from "./axios";

export const projectService = {
  // Отримати тільки активні проєкти (версії)
  getMyProjects: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },

  // Отримати всю історію (архів)
  getArchive: async () => {
    const response = await api.get('/api/projects/archive');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  create: async (projectData) => {
    const response = await api.post('/api/projects', projectData);
    return response.data;
  },

  update: async (id, projectData) => {
    const response = await api.put(`/api/projects/${id}`, projectData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
  },

  createNextVersion: async (id) => {
    const response = await api.post(`/api/projects/${id}/version`);
    return response.data;
  },

  downloadBom: async (id, projectName) => {
    const response = await api.get(`/api/projects/${id}/bom`, {
      responseType: 'blob', // Важливо для скачування файлів
    });
    
    // Створення посилання для скачування
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${projectName || 'project'}_bom.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
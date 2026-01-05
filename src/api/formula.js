import api from "./axios";

export const formulaService = {
  getFormulas: async() => {
    const response = await api.get('/api/formulas')
    return response.data
  },

  getFormulasAdmin: async (id) => {
    const response = await api.get(`/api/formulas/author/${id}`)
    return response.data
  },

  getFormula: async(id) => {
    const response = await api.get(`/api/formulas/${id}`)
    return response.data
  },

  createFormula: async(formula) => {
    const response = await api.post('/api/formulas', formula)
    return response.data
  },

  updateFormula: async(id, formula) => {
    const response = await api.patch(`/api/formulas/${id}`, formula)
    return response.data
  },

  uploadScheme: async (scheme) => {
    const response = await api.post('/api/formulas/scheme', scheme, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
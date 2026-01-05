import api from '@/api/axios';

export const authService = {
  // --- БАЗОВА АВТОРИЗАЦІЯ ---

  // Реєстрація: {firstName, lastName, email, password }
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  // Вхід: { email, password }
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  // Підтвердження реєстрації (токен приходить з URL)
  verifyEmail: async (token) => {
    const response = await api.patch('/api/auth/confirm', null, { params: { token } });
    return response.data;
  },

  // Запит на повторний лист підтвердження
  resendVerificationEmail: async (email, token) => {
    const response = await api.post('/api/auth/confirm', { email, token });
    return response.data;
  },

  // --- LINK LOGIN (Вхід без паролю) ---
  // Крок 1: Запросити посилання на пошту
  sendLinkLogin: async (email) => {
    const response = await api.post('/api/auth/link-login', { email });
    return response.data;
  },

  // Крок 2: Увійти, використавши токен з посилання в листі
  loginWithLinkToken: async (token) => {
    const response = await api.get('/api/auth/link-login', { params: { token } });
    return response.data;
  },

  // --- ВІДНОВЛЕННЯ ПАРОЛЮ ---

  // Крок 1: Відправити email для скидання
  forgotPassword: async (email) => {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  // Крок 2: Встановити новий пароль
  resetPassword: async ({ token, newPassword }) => {
    const response = await api.post('/api/auth/reset-password', { token, newPassword });
    return response.data;
  },
};
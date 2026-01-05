import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '@/api/auth';
import { userService } from '@/api/user';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const applyServerSettings = (settingsData) => {
    if (!settingsData) return;
    try {
      const settings = typeof settingsData === 'string' ? JSON.parse(settingsData) : settingsData;
      
      if (settings.theme && settings.theme !== theme) {
        setTheme(settings.theme);
      }
      if (settings.language && settings.language !== i18n.language) {
        i18n.changeLanguage(settings.language);
        localStorage.setItem('i18nextLng', settings.language);
      }
    } catch (e) {
      console.error("Помилка парсингу налаштувань:", e);
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const userData = await userService.getProfile();
          setUser(userData);
          applyServerSettings(userData.settings);
        } catch (error) {
          console.error("Session restoration failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const updateUserPreferences = async (newSettings) => {
    if (newSettings.theme) setTheme(newSettings.theme);
    if (newSettings.language) {
      i18n.changeLanguage(newSettings.language);
      localStorage.setItem('i18nextLng', newSettings.language);
    }

    if (user) {
      try {
        const currentSettings = {
          theme: newSettings.theme || theme,
          language: newSettings.language || i18n.language
        };
        
        setUser(prev => ({ ...prev, settings: JSON.stringify(currentSettings) }));
        await userService.updateSettings(currentSettings); 
      } catch (error) {
        console.error("Failed to save settings to DB", error);
      }
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const data = await authService.login(credentials);
      if (!data.token) throw new Error("Token not received");
      
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const userData = await userService.getProfile();
      setUser(userData);
      applyServerSettings(userData.settings);

      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginWithJWT = async (jwt) => {
    if (!jwt) return;
    setLoading(true);
    try {
      localStorage.setItem('token', jwt);
      setToken(jwt);
      const userData = await userService.getProfile();
      setUser(userData);
      applyServerSettings(userData.settings);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const loginWithLinkToken = async (linkToken) => {
    try {
      setLoading(true);
      const data = await authService.loginWithLinkToken(linkToken);
      if (!data.token) throw new Error("Token not received");
      
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const userData = await userService.getProfile();
      setUser(userData);
      applyServerSettings(userData.settings);

      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      throw error;
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: !!user,
    
    // Auth actions
    login,
    register,
    logout,
    loginWithJWT,
    loginWithLinkToken,
    
    // Preferences
    theme,
    isDark: theme === 'dark',
    currentLanguage: i18n.language,
    
    // Preferences actions
    updateUserPreferences,
    toggleTheme: () => updateUserPreferences({ theme: theme === 'light' ? 'dark' : 'light' }),
    changeLanguage: (lang) => updateUserPreferences({ language: lang }),
    setUser

  }), [user, token, loading, theme, i18n.language]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
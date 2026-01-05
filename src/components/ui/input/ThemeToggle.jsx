import { useAuth } from '@/context/AuthContext';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useAuth();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                 border border-gray-200 dark:border-gray-700 transition-all duration-200 
                 flex items-center justify-center text-xl shadow-sm group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="group-hover:scale-110 transition-transform duration-200">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;
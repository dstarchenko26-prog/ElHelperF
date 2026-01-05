import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

const LanguageSelector = ({
  value,
  onChange,
  options,
  variant = 'cycler', // 'toggle', 'select', 'cycler'
  className = ''
}) => {
  const { i18n } = useTranslation();
  const { updateUserPreferences } = useAuth();
  
  const isControlled = value !== undefined && onChange !== undefined;
  
  const currentLang = isControlled ? value : i18n.language;
  
  const handleLanguageChange = (code) => {
    if (isControlled) {
      onChange(code);
    } else {
      updateUserPreferences({ language: code });
      i18n.changeLanguage(code); 
    }
  };

  const languages = options || [
    { code: 'uk', label: 'UA' },
    { code: 'en', label: 'EN' }
  ];

  if (variant === 'select') {
    return (
      <div className={`relative ${className}`}>
        <select
          type='select'
          value={currentLang}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="appearance-none bg-gray-50 dark:bg-gray-800 text-sm font-bold rounded-lg pl-3 pr-8 py-2 
                     border border-gray-200 dark:border-gray-700 outline-none 
                     focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer w-full"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (variant === 'cycler') {
    const cycleNext = () => {
      const currentIndex = languages.findIndex(l => l.code === currentLang);
      const nextIndex = (currentIndex + 1) % languages.length;
      handleLanguageChange(languages[nextIndex].code);
    };

    const currentLabel = languages.find(l => l.code === currentLang)?.label || currentLang;

    return (
      <button
        type='button'
        onClick={cycleNext}
        className={`flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg 
                   border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 
                   transition-all text-sm font-bold text-gray-700 dark:text-gray-200 ${className}`}
        title="Change language"
      >
        <span>{currentLabel}</span>
      </button>
    );
  }

  return (
    <div className={`flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {languages.map((lang) => (
        <button
          type='button'
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex-1 px-2.5 py-1.5 rounded-lg text-[14px] font-black uppercase transition-all duration-200 ${
            currentLang === lang.code
              ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-white'
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
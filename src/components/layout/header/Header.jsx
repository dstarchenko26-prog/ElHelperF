import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

import { Button, Row, Heading } from '@/components/ui';

import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user, logout, toggleTheme, isDark, changeLanguage } = useAuth();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLangSwitch = () => {
    changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  const getLinkClass = (path) => {
    const base = "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition duration-200";
    const active = "text-blue-600 dark:text-blue-400 font-bold";
    return location.pathname === path ? active : base;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        
        <Row justify="between" align="center">
          
          <Link to="/" className="hover:opacity-80 transition">
            <Heading variant="h4" className="text-blue-600 dark:text-blue-400 m-0">
                ⚡ elHelper
            </Heading>
          </Link>

          <div className="hidden md:block">
            <Row align="center" gap="lg">
              <Row gap="md">
                <Link to="/wiki" className={getLinkClass('/wiki')}>{t('common.wiki')}</Link>
                <Link to="/projects" className={getLinkClass('/projects')}>{t('common.projects')}</Link>
                <Link to="/profile" className={getLinkClass('/profile')}>{t('common.profile')}</Link>
                    
                {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                  <Link to="/admin" className={getLinkClass('/admin')}>{t('common.admin_page')}</Link>
                )}
              </Row>
                
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <Row gap="sm">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-xl">
                  {isDark ? '🌙' : '🌞'}
                </button>
                <button onClick={handleLangSwitch} className="px-2 py-1 text-sm font-bold border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition uppercase">
                  {i18n.language}
                </button>
              </Row>

              {user ? (
                <Button onClick={logout} variant="danger" size="sm">
                  {t('common.logout')}
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="primary" size="sm">
                    {t('common.login')}
                  </Button>
                </Link>
              )}
            </Row>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </Row>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
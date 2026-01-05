import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';

import { Button, Col, Row, Divider, Text} from '@/components/ui';

const MobileMenu = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { user, logout, toggleTheme, isDark, changeLanguage } = useAuth();

  if (!isOpen) return null;

  const handleLangSwitch = () => {
    changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  const linkStyle = "text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors";

  return (
    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pt-4 pb-6 shadow-lg animate-fade-in-down">
      <Col gap="md">
        
        <Col gap="sm">
          <Link to="/wiki" className={linkStyle} onClick={onClose}>{t('common.wiki')}</Link>
          <Link to="/projects" className={linkStyle} onClick={onClose}>{t('common.projects')}</Link>
          <Link to="/profile" className={linkStyle} onClick={onClose}>{t('common.profile')}</Link>
          
          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <Link to="/admin" className={linkStyle} onClick={onClose}>
              {t('common.admin_page')}
            </Link>
          )}
        </Col>
        
        <Divider />
        
        <Col gap="sm">
          <Row justify="between" align="center">
            <Text>{t('common.theme')}</Text>
            <button onClick={toggleTheme} className="text-2xl p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {isDark ? '🌙' : '🌞'}
            </button>
          </Row>

          <Row justify="between" align="center">
            <Text>{t('common.language')}</Text>
            <button onClick={handleLangSwitch} className="font-bold border px-3 py-1 rounded dark:text-white uppercase hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              {i18n.language}
            </button>
          </Row>
        </Col>

        {user ? (
          <Button onClick={logout} variant="danger" className="w-full mt-2">
            {t('common.logout')}
          </Button>
        ) : (
          <Link to="/auth" onClick={onClose} className="w-full">
             <Button variant="primary" className="w-full mt-2">{t('common.login')}</Button>
          </Link>
        )}
      </Col>
    </div>
  );
};

export default MobileMenu;
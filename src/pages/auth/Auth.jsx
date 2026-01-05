import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Col, Card, Heading, Text
} from '@/components/ui'

import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

function Auth() {
  const [view, setView] = useState('login'); // 'login', 'register', 'forgot-password', 'link-login'
  const { t } = useTranslation();

  const getHeaderContent = () => {
    switch (view) {
      case 'register':
        return {
          title: t('auth.register_title'),
          desc: t('auth.register_desc')
        };
      case 'forgot-password':
        return {
          title: t('auth.forgot_password_title'),
          desc: t('auth.forgot_password_desc')
        };
      case 'link-login':
        return {
          title: t('auth.link_login_title'),
          desc: t('auth.link_login_desc')
        };
      case 'login':
      default:
        return {
          title: t('auth.login_title'),
          desc: t('auth.login_desc')
        };
    }
  };

  const { title, desc } = getHeaderContent();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
      <Card 
        className="w-full max-w-md" 
        shadow="lg" 
        padding="lg"
      >
        <Col className="mb-8" align="center" gap='xs'>
          <Heading variant="h2" className="mb-2">
            {title}
          </Heading>
          <Text variant="small" className="mx-auto max-w-xs">
            {desc}
          </Text>
        </Col>

        {view === 'login' && <LoginForm onSwitchView={setView} />}
        
        {view === 'register' && <RegisterForm onSwitchView={setView} />}
        
        {(view === 'forgot-password' || view === 'link-login') && (
          <ForgotPasswordForm 
            onSwitchView={setView} 
            isLinkLogin={view === 'link-login'} 
          />
        )}

      </Card>
    </div>
  );
}

export default Auth;
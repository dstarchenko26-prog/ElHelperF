import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { authService } from '@/api/auth';

import {
  Input, Button,
  Col,
  Alert
} from '@/components/ui';

const ForgotPasswordForm = ({ onSwitchView, isLinkLogin = false }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    if(isLinkLogin) {
      try {
        await authService.sendLinkLogin(email);
        alert(t('auth.link_login_success'))
        onSwitchView('login')
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setMessage(t(errorMessage)); 
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await authService.forgotPassword(email);
        alert(t('auth.forgot_password_success'))
        onSwitchView('login')
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setMessage(t(errorMessage)); 
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="md">
        {message && (
          <Alert variant="error" showIcon={false}>
            {message}
          </Alert>
        )}

        <Input
          label={t('auth.email_label')}
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        <Col gap="sm">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {t('common.send')}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onSwitchView('login')}
          >
            {t('common.cancel')}
          </Button>
        </Col>
      </Col>
    </form>
  );
};

export default ForgotPasswordForm;
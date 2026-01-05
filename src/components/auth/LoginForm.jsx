import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { useAuth } from '@/context/AuthContext';

import {
  Input, Button,
  Row, Col, Divider,
  Text, GoogleIcon,
  Alert
} from '@/components/ui';

const LoginForm = ({ onSwitchView }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/profile';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      setError(t(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleClick = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="md">
        
        {error &&
          <Alert variant="error" showIcon={false}>
            {error}
          </Alert>
        }

        <Input
          label={t('auth.email_label')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          disabled={isLoading}
        />

        <Input
          label={t('auth.password_label')}
          labelAction={
            <Button
              variant="link"
              onClick={() => onSwitchView('forgot-password')}
            >
              {t('auth.forgot_password_btn')}
            </Button>
          }
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
        >
          {t('common.login')}
        </Button>
      </Col>

      <Divider text={t('common.or')} align="center" />

      <Col gap="sm">
        <Button
          variant="neutral"
          onClick={handleGoogleClick}
          leftIcon={<GoogleIcon />}
          fullWidth
        >
          Google
        </Button>

        <Button
          variant="neutral"
          onClick={() => onSwitchView('link-login')}
          fullWidth
        >
          📧 {t('auth.link_login_btn')}
        </Button>
      </Col>

      <Row justify="center" gap="xs" className="mt-6">
        <Text variant="small">{t('auth.not_registered')}</Text>
        <Button
          variant="link"
          onClick={() => onSwitchView('register')}
          className="text-sm font-semibold"
        >
          {t('auth.register')}
        </Button>
      </Row>
    </form>
  );
};

export default LoginForm;
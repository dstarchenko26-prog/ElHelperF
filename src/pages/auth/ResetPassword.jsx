import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { authService } from '@/api/auth';

import {
  Card, Heading, Text,
  Button, Input,
  Alert, StatusIcon,
  Col
} from '@/components/ui';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = searchParams.get('token');

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError(t('auth.no_token'));
    }
  }, [token, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validatePassword = (pass) => {
    // Мінімум 8 символів, 1 буква, 1 цифра
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.password_mismatch'));
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(t('auth.password_complexity'));
      return;
    }

    setStatus('loading');
    try {
      await authService.resetPassword({ 
        token, 
        newPassword: formData.password 
      });

      setStatus('success');
      
      setTimeout(() => {
        navigate('/auth');
      }, 6000);

    } catch (error) {
        setStatus('idle');
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setError(t(errorMessage));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
      <Card className="w-full max-w-md" padding="lg">
        
        {status === 'success' ? (
          <Col align="center" gap="md" className="text-center">
            <StatusIcon type="success" size="xl" withBackground />
            <Heading variant="h3">{t('auth.reset_success_title')}</Heading>
            <Text>{t('auth.reset_success_desc')}</Text>
            <Button onClick={() => navigate('/auth')} variant="primary" fullWidth>
              {t('common.login')}
            </Button>
          </Col>
        ) : (
          <form onSubmit={handleSubmit}>
            <Col align="center" gap='md'>
                <Heading variant="h3">{t('auth.reset_title')}</Heading>
                <Text variant="small">{t('auth.reset_desc')}</Text>

              {error && (
                <Alert variant="error" showIcon={false}>
                  {error}
                </Alert>
              )}

              <fieldset disabled={!token} className="contents">
                <Input
                  label={t('auth.new_password_label')}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  error={error && !validatePassword(formData.password) && formData.password.length > 0 ? t('auth.password_easy') : null}
                />

                <Input
                  label={t('auth.confirm_password_label')}
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  error={error && formData.password !== formData.confirmPassword ? t('auth.password_mismatch') : null}
                />
              </fieldset>
              
              <Text variant='small'>
                {t('auth.password_desc')}
              </Text>

              <Button
                type="submit"
                variant="primary"
                isLoading={status === 'loading'}
                fullWidth
                disabled={!token}
              >
                {t('auth.reset_btn')}
              </Button>

              <Button variant="ghost" onClick={() => navigate('/auth')} fullWidth>
                {t('common.cancel')}
              </Button>
            </Col>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
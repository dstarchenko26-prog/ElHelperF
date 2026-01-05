import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { useAuth } from '@/context/AuthContext';

import {
  Input, Button,
  Row, Col,
  Text,
  Alert
} from '@/components/ui';

const RegisterForm = ({ onSwitchView }) => {
  const { t } = useTranslation();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({ 
    name: '', 
    surname: '',
    email: '', 
    password: '', 
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validatePassword = (pass) => {
    // Мінімум 8 символів, хоча б одна буква і хоча б одна цифра
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.password_mismatch'));
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(t('auth.password_complexity'));
      setIsLoading(false);
      return;
    }

    try {
      await register({
        firstName: formData.name,
        lastName: formData.surname,
        email: formData.email,
        password: formData.password
      });
      
      alert(t('auth.register_next_step'));
      onSwitchView('login');
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      setError(t(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Col gap="md">
        {error && (
          <Alert variant="error" showIcon={false}>
            {error}
          </Alert>
        )}

        <Row gap="md" className="flex-col md:flex-row">
          <Input
            label={t('auth.name_label')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t('auth.name_example')}
          />
          <Input
            label={t('auth.surname_label')}
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            placeholder={t('auth.surname_example')}
          />
        </Row>

        <Input
          label={t('auth.email_label')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
        />

        <Input
          label={t('auth.password_label')}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••••"
          error={error && !validatePassword(formData.password) ? t('auth.password_easy') : null}
        />

        <Input
          label={t('auth.confirm_password_label')}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="••••••••"
          error={error && formData.password !== formData.confirmPassword ? t('auth.errors.password_mismatch') : null}
        />

        <Text variant='small'>
          {t('auth.password_desc')}
        </Text>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          fullWidth
        >
          {t('auth.submit_register')}
        </Button>
      </Col>

      <Row justify="center" gap="xs" className="mt-6">
        <Text variant="small">{t('auth.already_registered')}</Text>
        <Button
          variant="link"
          onClick={() => onSwitchView('login')}
          className="text-sm font-semibold"
        >
          {t('common.login')}
        </Button>
      </Row>
    </form>
  );
};

export default RegisterForm;
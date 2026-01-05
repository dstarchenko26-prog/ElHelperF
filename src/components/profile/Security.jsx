import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import {
  Card, Heading,
  Button, Input, 
  Alert,
  Row, Col
} from '@/components/ui';

const SecurityCard = ({onSwitchView}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ current: '', new: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (formData.new !== formData.confirm) {
      setError(t('auth.password_mismatch'));
      return;
    }

    if (!validatePassword(formData.new)) {
      setError(t('auth.password_complexity'));
      return;
    }

    setLoading(true);
    try {
      await userService.changePassword({ 
        currentPassword: formData.current,
        newPassword: formData.new
      });
      alert(t('user.password_changed'));
      setFormData({ current: '', new: '', confirm: '' });
      onSwitchView('info')

    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      setError(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <Col justify="between" className="h-full">
        <Heading variant='h3'>
          {t('user.security_title')}
        </Heading>

        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}
        
        <Input
          name='current'
          label={t('user.current_password')}
          type="password"
          value={formData.current}
          onChange={handleChange}
          required
          placeholder="••••••••"
        />
                  
        <Input
          name='new'
          label={t('auth.new_password_label')}
          type="password"
          value={formData.new}
          onChange={handleChange}
          required
          placeholder="••••••••"
          error={error && !validatePassword(formData.new) && formData.new.length > 0 ? t('auth.password_easy') : null}
        />

        <Input
          name='confirm'
          label={t('auth.confirm_password_label')}
          type="password"
          value={formData.confirm}
          onChange={handleChange}
          required
          placeholder="••••••••"
          error={error && formData.new !== formData.confirm ? t('auth.password_mismatch') : null}
        />

        <Row justify='between'>
          <Button variant='ghost' onClick={() => onSwitchView('info')}>
            {t('common.cancel')}
          </Button>

          <Button variant="danger" onClick={handleSubmit} disabled={loading || !formData.current} isLoading={loading}>
            {t('user.update_password')}
          </Button>
        </Row>
      </Col>
    </Card>
  );
};

export default SecurityCard;
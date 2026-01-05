import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { useAuth } from '@/context/AuthContext';

import {
  Card, Heading, Text,
  Button,
  Alert, Spinner, StatusIcon,
  Col
} from '@/components/ui';

const Oauth2 = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginWithJWT } = useAuth();

  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // 'loading', 'error'
  const [error, setError] = useState('');
  
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) return;

    if (!token) {
      setStatus('error');
      setError(t('auth.no_token'));
      return;
    }

    const performLogin = async () => {
      try {
        await loginWithJWT(token);
        navigate('/profile', { replace: true });
        
      } catch (error) {
        setStatus('error');
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setError(t(errorMessage));
      }
    };

    performLogin();

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
      <Card className="w-full max-w-md text-center" padding="lg">
        
        {status === 'loading' && (
          <Col align="center" gap="md">
            <Spinner size="xl" variant="primary" />
            <Heading variant="h4">{t('auth.logging_in')}</Heading>
            <Text variant="small">{t('common.plw')}</Text>
          </Col>
        )}

        {status === 'error' && (
          <Col align="center" gap="md" className="text-left">
            <StatusIcon type="error" size="xl" withBackground />
            
            <Heading variant="h3" className="text-center">
              {t('auth.login_failed')}
            </Heading>
            
            <Alert variant="error" showIcon={false}>
              {error}
            </Alert>
            
            <Button variant="ghost" onClick={() => navigate('/auth')} fullWidth>
              {t('auth.back_to_login')}
            </Button>
          </Col>
        )}

      </Card>
    </div>
  );
};

export default Oauth2;
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { authService } from '@/api/auth';

import {
  Card, Heading, Text,
  Button, Input,
  Alert, Spinner, StatusIcon,
  Col
} from '@/components/ui';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const token = searchParams.get('token'); 

  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [isResend, setIsResend] = useState(false); 

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current === true) return;

    if (!token) {
      setStatus('error');
      setMessage(t('auth.no_token'));
      return;
    }

    const verify = async () => {
      try {
        await authService.verifyEmail(token);        
        setStatus('success');
      } catch (error) {
        setStatus('error');
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setMessage(t(errorMessage)); 
      }
    };

    verify();

    return () => {
      initialized.current = true;
    };
  }, [token, navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    setMessage('');
    if (isResend === false) {
      setResendLoading(true);
      try {
        await authService.resendVerificationEmail(resendEmail, token);
        alert(t('auth.verification_sent'));
        setResendEmail('');
        setIsResend(true);
      } catch (error) {
        setStatus('error');
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        setMessage(t(errorMessage));
      } finally {
        setResendLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
      <Card className="w-full max-w-md text-center" padding="lg">
        
        {status === 'loading' && (
          <Col align="center" gap="md">
            <Spinner size="xl" color="primary" />
            <Text>{t('auth.verifying')}</Text>
          </Col>
        )}

        {status === 'success' && (
          <Col align="center" gap="md">
            <StatusIcon type="success" size="xl" withBackground />
            <Heading variant="h3">{t('auth.verify_success_title')}</Heading>
            <Text>
              {t('auth.verify_success_desc')}
            </Text>
            <Button onClick={() => navigate('/auth')} variant="primary" className="mt-4">
              {t('common.login')}
            </Button>
          </Col>
        )}

        {status === 'error' && (
          <Col align="center" gap="md" className="text-left">
            <StatusIcon type="error" size="xl" withBackground />
            
            <Heading variant="h3" align='center'>
              {t('auth.verify_error_title')}
            </Heading>
            
            {message && (
              <Alert variant="error" showIcon={false}>
                {message}
              </Alert>
            )}

            <Text variant="small" align='center' className="w-full">
              {t('auth.resend_instruction')}
            </Text>

            <form onSubmit={handleResend} className="w-full space-y-4">
              <Input 
                type="email" 
                placeholder="you@example.com"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="neutral" isLoading={resendLoading} fullWidth>
                {t('auth.resend_btn')}
              </Button>
            </form>
            
            <Button variant="ghost" onClick={() => navigate('/auth')} fullWidth>
              {t('common.back_to_login')}
            </Button>
          </Col>
        )}

      </Card>
    </div>
  );
};

export default VerifyEmail;
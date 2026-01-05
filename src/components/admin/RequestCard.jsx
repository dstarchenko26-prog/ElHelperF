import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import { Card, Col, Row, StatusIcon, TextArea, Button, Text } from '@/components/ui';

const RequestCard = ({ request, onRefresh }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [reply, setReply] = useState(false);
  const [comment, setComment] = useState(request.adminComment || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    setIsLoading(true);
    try {
      const req = {
        comment: comment,
        status: newStatus
      }
      await userService.setRequestStatus(request.id, req)
      onRefresh()
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));      
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(i18n.language, {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <Card className={request.status !== 'PENDING' ? 'opacity-80' : ''}>
      <Col>
        <Row justify='between' wrap align='center'>
          <Row gap='sm' align='center'>
            <Text 
              className="font-bold cursor-pointer hover:text-blue-600 dark:hover:text-blue-600 transition-colors" 
              onClick={() => navigate(`/profile/${request.user.id}`)}
            >
              {`${request.user?.firstName} ${request.user?.lastName}`}
            </Text>
            <Text className="text-sm hidden sm:block">{`| ${request.user?.email} |`}</Text>
            <Text className="text-sm">{formatDate(request.createdAt)}</Text>
          </Row>

          {request.status !== 'PENDING' && (
            <Row justify='end' gap='xs' align='center'>
              <StatusIcon type={request.status === 'APPROVED' ? 'success' : 'error'} />
              <Text className={`font-medium ${request.status === 'APPROVED' ? 'text-green-600 dark:text-green-600' : 'text-red-600 dark:text-red-600'}`}>
                {request.status === 'APPROVED' ? t('admin.request.st_app') : t('admin.request.st_rej')}
              </Text>
            </Row>
          )}
        </Row>

        <TextArea
          label={t('admin.request.user_text_label')}
          value={request.reason}
          disabled={true}
          rows={2}
        />

        {(request.status === 'PENDING' && !reply) && (
          <Row justify='between' gap='sm'>
            <Button 
              variant='success' 
              fullWidth
              onClick={() => handleUpdateStatus('APPROVED')}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {t('admin.request.set_app')}
            </Button>
            <Button 
              variant='danger' 
              fullWidth
              onClick={() => setReply(true)}
              disabled={isLoading}
            >
              {t('admin.request.set_rej')}
            </Button>
          </Row>
        )}
        
        {(reply || request.adminComment) && (
          <Col>
            <TextArea 
              label={t('admin.request.admin_text_label')}
              value={comment}
              disabled={request.status !== 'PENDING' || isLoading}
              rows={2}
              placeholder={t('admin.request.admin_text_placeholder')}
              onChange={(e) => setComment(e.target.value)}
            />
            
            {reply && (
              <Row justify='between' gap='sm'>
                <Button 
                  variant='neutral'
                  fullWidth
                  onClick={() => {
                    setReply(false);
                    setComment(request.adminComment || '');
                  }}
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  variant='danger' 
                  fullWidth
                  onClick={() => handleUpdateStatus('REJECTED')}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  {t('admin.request.confirm_rej')}
                </Button>
              </Row>
            )}
          </Col>
        )}
      </Col>
    </Card>
  );
};

export default RequestCard;
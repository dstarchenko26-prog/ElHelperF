import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import {
  Card, Heading,
  Button, Input, TextArea,
  Col, Row
} from '@/components/ui';

const InfoCard = ({ user, onSwitchView, onRefresh }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '',  bio: ''});

  useEffect(() => {
    if (user) {
      setFormData({ firstName: user.firstName || '', lastName: user.lastName || '', bio: user.bio || ''});
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await userService.updateProfile(formData);
      setIsEditing(false);
      onRefresh()
      alert(t('common.save_success'));
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <Col justify="between" className="h-full">
        <Heading variant='h3'>
          {t('user.personal_info')}
        </Heading>
      
        <Row gap="md" className="flex-col md:flex-row">
          <Input
            label={t('auth.name_label')}
            value={formData.firstName} 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
            disabled={!isEditing} 
          />

          <Input
            label={t('auth.surname_label')} 
            value={formData.lastName} 
            onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
            disabled={!isEditing} 
          />
        </Row>

        <TextArea
          label={t('user.bio_label')}
          placeholder={t('user.bio_placeholder')}
          value={formData.bio}
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          disabled={!isEditing}
        />

        <Row justify='between'>
          <Button variant='danger' onClick={() => onSwitchView('password')}>
            {t('user.change_password')}
          </Button>

          {isEditing ? (
            <Row gap="sm">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                {t('common.cancel')}
              </Button>
              <Button variant="success" onClick={handleSave} disabled={isLoading} isLoading={isLoading}>
                 {t('common.save')}
              </Button>
            </Row>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditing(true)}>
              {t('common.edit')}
            </Button>
          )}

        </Row>
      </Col>
    </Card>
  );
};

export default InfoCard;
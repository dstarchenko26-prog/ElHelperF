import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import {
  Card, Heading, Text, UserAvatar,
  Col, Row, Divider,
  Button, ThemeToggle, LanguageSelector,
  Badge
} from '@/components/ui';


const Avatar = ({ user, edit, onSwitchView, onRefresh }) => {
  const { t } = useTranslation();

  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  useEffect(() => {
      setAvatarUrl(user.avatarUrl)
    }, [user]
  )

  const updateAvatar = async (file) => {
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      alert(t('user.itisnt_image'));
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setIsUploading(true);
      const response = await userService.uploadAvatar(formData); 
      setAvatarUrl (response.avatarUrl)
      onRefresh()
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t('user.error_load_avatar'))
      alert(t(errorMessage));
    } finally {
      setIsUploading(false);
    }
  };

  const roleMap = {
    'USER': 'user.user_role',
    'ADMIN': 'user.admin_role',
    'SUPER_ADMIN': 'user.sa_role'
  };

  const colorMap = {
    'USER': 'success',
    'ADMIN': 'warning',
    'SUPER_ADMIN': 'danger',
  };

return (
    <Card className="h-full">
      <Col align="center" gap="xs">
        <UserAvatar
          src={avatarUrl}
          alt={user.firstName}
          size="xl"
          editable={edit}
          isUploading={isUploading}
          onFileSelect={updateAvatar}
          className="ring-4 ring-offset-2 ring-blue-500/20"
        />

          <Heading variant="h4" className="mb-1">
            {user.firstName} {user.lastName}
          </Heading>
          <Text variant="small" className="text-gray-500 dark:text-gray-400 block mb-3">
            {user.email}
          </Text>
          <Badge color={colorMap[user.role]}>
            {t(roleMap[user.role])}
          </Badge>
      </Col>

      {edit && (
        <Col gap="md" className="mt-4">
          <Divider />

          <Row justify="between" align="center">
            <Text variant='small'>{t('common.theme')}</Text>
            <ThemeToggle />
          </Row>

          <Row justify="between" align="center">
            <Text variant='small'>{t('common.language')}</Text>
            <LanguageSelector variant='toggle'/>
          </Row>

          {user.role === 'USER' && (
            <Button 
              variant="neutral"
              onClick={() => onSwitchView('admin')}
            >
              {t('user.request_admin')}
            </Button>
          )}
        </Col>
      )}
    </Card>
  );
};

export default Avatar;
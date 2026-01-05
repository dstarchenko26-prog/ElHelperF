import { useTranslation } from "react-i18next";

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import {Col, Heading, Text, Row, Button, StatusIcon, Card, Divider} from '@/components/ui';

const Reject = ({onSwitchView, req, refresh}) => {
  const {t} = useTranslation()


  const handleMarkAsRead = async () => {
    try {
      await userService.archiveAdminRequest(req.id);
      refresh()
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  };

  return (
    <Col justify="between" className="h-full" gap="sm" align="center">
      <Heading variant='h3'>
        {t('user.rej_adm_req_title')}
      </Heading>

      <StatusIcon type="error" size="xl" withBackground/>

      <Card padding="sm" className="w-full">
        <Text variant="small" className="font-bold text-red-600 dark:text-red-300">
          {t('user.admin_comment')}
        </Text>
        <Divider className="my-2" />
        <Text variant="small" className="italic text-red-600 dark:text-red-300">
          {req.adminResponse || t('user.no_comment')}
        </Text>
      </Card>

      <Row justify='between' className="w-full">
        <Button variant='ghost' onClick={() => onSwitchView('info')}>
          {t('common.prev')}
        </Button>

        <Button 
          variant="neutral" 
          onClick={handleMarkAsRead}
        >
          {t('user.mark_read')}
        </Button>
      </Row>
    </Col>
  )
}

export default Reject;
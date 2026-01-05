import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

import { Col, Heading, StatusIcon, Text, Card, Divider, Button } from '@/components/ui';

const View = ({onSwitchView, req}) => {
  const {t, i18n} = useTranslation();

  const dateLocale = i18n.language === 'uk' ? uk : enUS;

  return (
    <Col justify="between" className="h-full" gap="sm" align="center">
      <Heading variant='h3'>
        {t('user.view_adm_req_title')}
      </Heading>

      <StatusIcon type='pending' size="xl"/>

      <Text align="center">
        {t('user.pending_desc')}
      </Text>

      <Card padding="sm" className="w-full">
        <Text variant="small" className="font-bold">{t('user.your_reason')}:</Text>
        <Text variant="small" className="italic">"{req.reason}"</Text>
        <Divider className="my-2" />
        <Text variant="caption" className="text-gray-400">
          {t('user.time_sent')}: {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true, locale: dateLocale })}
        </Text>
      </Card>

      <Button fullWidth variant='ghost' onClick={() => onSwitchView('info')}>
        {t('common.prev')}
      </Button>
    </Col>
  )
}

export default View;
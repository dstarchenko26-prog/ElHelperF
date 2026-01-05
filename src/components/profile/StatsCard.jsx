import { useTranslation } from 'react-i18next';

import {Card, Col, Text, Heading} from '@/components/ui';

const ProfilePreferencesCard = ({user}) => {
  const { t, i18n } = useTranslation();

  const bio = user.bio === null ? t('user.no_bio') : user.bio;
  const currentLang = i18n.language;

  return (
    <Card className="h-full">
      <Col justify="between" className="h-full" gap='sm'>
        <Heading variant='h3'>
          {t('user.stat_title')}
        </Heading>
        <Text>{`${t('user.bio')}: ${bio}`}</Text>
        <Text>{`${t('user.registeredAt')}: ${new Date(user.registeredAt).toLocaleDateString(currentLang)}`}</Text>
        <Text>{`${t('user.count_proj')}: ${user.projectsCount}`}</Text>
        <Text>{`${t('user.count_art')}: ${user.articlesCount}`}</Text>
        <Text>{`${t('user.count_com')}: ${user.commentsCount}`}</Text>
        <Text>{`${t('user.count_form')}: ${user.formulasCount}`}</Text>
      </Col>
    </Card>
  );
};

export default ProfilePreferencesCard;
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';

import MenuItem from '@/components/admin/MenuItem';

import { Heading, Text, Col, Grid, Container } from '@/components/ui';

const AdminMenu = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const menuItems = [
    {
      id: 'theory',
      title: t('admin.menu.theory_title'),
      description: t('admin.menu.theory_subtitle'),
      icon: '📚',
      path: '/admin/theory',
      color: 'bg-blue-500',
      variant: 'blue'
    },
    {
      id: 'calculator',
      title: t('admin.menu.calc_title'),
      description: t('admin.menu.calc_subtitle'),
      icon: '🧮',
      path: '/admin/calc',
      color: 'bg-emerald-500',
      variant: 'emerald'
    }
  ];

  const superAdminItems = [
    {
      id: 'admin_request',
      title: t('admin.menu.admin_request_title'),
      description: t('admin.menu.admin_request_subtitle'),
      icon: '📋',
      path: '/admin/admin-request',
      color: 'bg-yellow-500',
      variant: 'yellow'
    }
  ]

  return (
    <Container size='2xl'>
      <Col gap="xl" align="center">
        <Col align='center'>
          <Heading variant="h2">{t('admin.menu.main_title')}</Heading>
          <Text className="text-lg">
            {t('admin.menu.main_subtitle')}
          </Text>
        </Col>

        <Grid cols={{base: 1, md: 2}} gap='xl'>
          {menuItems.map((item) => (
            <MenuItem item = {item}/>
          ))}

          {user.role === 'SUPER_ADMIN' && superAdminItems.map((item) => (
            <MenuItem item = {item}/>
          ))}
        </Grid>
      </Col>
    </Container>
  );
};

export default AdminMenu;
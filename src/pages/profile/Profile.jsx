import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Додано imports
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';
import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import { Heading, Spinner, Button, Col, Container, Grid } from '@/components/ui';

import AvatarCard from '@/components/profile/Avatar';
import InfoCard from '@/components/profile/Info';
import SecurityCard from '@/components/profile/Security';
import AdminRequest from '@/components/profile/AdminRequest';
import StatCard from '@/components/profile/StatsCard'

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser, setUser: update } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState ('info'); //info, password, admin
  const [profileUser, setProfileUser] = useState(null);

  const isOwnProfile = !userId;

  const loadData = async () => {
    setLoading(true);
    setView('info')
    try {
      if (isOwnProfile) {
        setEdit(true)
        setProfileUser(currentUser);
      } else {
        setEdit(false);
        const data = await userService.getPublicProfile(userId);
        setProfileUser(data);
      }
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
      setProfileUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
        loadData();
    }
  }, [userId, currentUser, isOwnProfile]);

  if (loading) return <div className="flex justify-center p-20"><Spinner size="xl"/></div>;
  
  if (!profileUser) {
    return (
      <Col align='center'>
        <Heading variant="h3">{t('user.user_not_found')}</Heading>
        <Button variant="primary" onClick={() => navigate(-1)} className="mt-4">
          {t('common.back')}
        </Button>
      </Col>
    );
  }

  return (
    <Container>
      <Heading variant="h2" className='mb-4'>{t('user.title')}</Heading>
      <Grid cols={{base: 1, lg: 3}} gap='lg'>
        <Col className="lg:col-span-1">
          <AvatarCard user={profileUser} edit={edit} onSwitchView={setView}/>
        </Col>

        <Col className="lg:col-span-2">
          {(view === 'info' && edit) && <InfoCard user={profileUser} onSwitchView={setView} onRefresh={async () => update(await userService.getProfile())} />}
          {(view === 'password' && edit) && <SecurityCard onSwitchView={setView}/>}
          {(view === 'admin' && edit) && <AdminRequest onSwitchView={setView}/>}
          {!edit && <StatCard user={profileUser}/>}
        </Col>

      </Grid>
    </Container>
  );
};

export default Profile;
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import { Card, Spinner } from '@/components/ui';

import Send from '@/components/profile/AdmReq/Send';
import View from '@/components/profile/AdmReq/View'
import Reject from '@/components/profile/AdmReq/Reject';


const AdminRequestCard = ({ onSwitchView }) => {
  const { t } = useTranslation;
  const [loading, setLoading] = useState(false);
  const [adminRequest, setAdminRequest] = useState(null);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const data = await userService.getAdminRequest();
      setAdminRequest(data);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
      setAdminRequest(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const refreshData = () => fetchRequest();

  if (loading) return <Card className="h-full flex items-center justify-center"><Spinner size="lg" /></Card>;

  return (
    <Card className="h-full">
        {!adminRequest && (
          <Send onSwitchView={onSwitchView} refresh={refreshData}/>
        )}

        {adminRequest?.status === 'PENDING' && (
          <View onSwitchView={onSwitchView} req={adminRequest}/>
        )}

        {adminRequest?.status === 'REJECTED' && (
          <Reject onSwitchView={onSwitchView} req={adminRequest} refresh={refreshData}/>
        )}
    </Card>
  );
};

export default AdminRequestCard;
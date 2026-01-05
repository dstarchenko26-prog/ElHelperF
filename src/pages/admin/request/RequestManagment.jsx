import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { userService } from '@/api/user';

import RequestCard from '@/components/admin/RequestCard';

import {Heading, Col, Row, Text, Spinner, Container, EmptyState} from '@/components/ui';

import { SearchX } from 'lucide-react';

const AdminRequestsPage = () => {
  const { t } = useTranslation()

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState('PENDING');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllRequest();
      setRequests(data);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(req => {
    if (filter === 'PENDING') return req.status === 'PENDING';
    return true;
  });

  if (loading) return <div className="flex justify-center p-20"><Spinner size="xl"/></div>;

  return (
    <Container size='2xl'>
      <Col gap="lg">
        <Row justify='between'>
          <Col gap='xs'>
            <Heading variant='h2'>
              {t('admin.request.title')}
            </Heading>
            <Text>
              {t('admin.request.subtitle')}
            </Text>
          </Col>

          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex gap-1">
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                filter === 'PENDING' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {t('admin.request.filt_pend')}
            </button>
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                filter === 'ALL' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {t('admin.request.filt_all')}
            </button>
          </div>
        </Row>

        {filteredRequests.length === 0 ? (
          <EmptyState
            title={t('admin.request.no_request')}
            icon={<SearchX/>}
          />
        ) : (
          filteredRequests.map((req) => (
            <RequestCard request={req} onRefresh={() => fetchRequests()}/>
          ))
        )}
      </Col>
    </Container>
  );
};

export default AdminRequestsPage;
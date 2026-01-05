import { useTranslation } from "react-i18next"
import { useState } from "react";

import { getErrorKey } from "@/api/errorHandler";
import { userService } from "@/api/user";

import {Col, Heading, TextArea, Row, Button} from '@/components/ui';

const Send = ({onSwitchView, refresh}) => {
  const {t} = useTranslation()

  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await userService.postAdminRequest(reason);
      refresh()
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return(
    <Col justify="between" className="h-full">
      <Heading variant='h3'>
        {t('user.send_adm_req_title')}
      </Heading>

      <TextArea
        label={t('user.reason_label')}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        disabled={loading}
        rows={6}
        placeholder={t('user.reason_placeholder')}
      />

      <Row justify='between'>
        <Button variant='ghost' onClick={() => onSwitchView('info')}>
          {t('common.cancel')}
        </Button>

        <Button variant="primary" onClick={handleSubmit} disabled={reason.length < 20} isLoading={loading}>
          {t('common.send')}
        </Button>
      </Row>
    </Col>
  )
}

export default Send;
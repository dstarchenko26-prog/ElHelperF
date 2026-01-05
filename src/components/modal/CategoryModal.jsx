import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { categoryService } from '@/api/category';

import {
  Button, Input, Col, Row, Modal
} from '@/components/ui';

const CategoryModal = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation()
  
  const [names, setNames] = useState({ uk: '', en: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isInvalid = !names.uk.trim() || !names.en.trim();

  const handleSave = async () => {
    if (isInvalid) {
      setError(t('common.has_cat'))
    }
    setLoading(true);
    try {
      const newCat = await categoryService.createCategory({ names: names });
      onSuccess(newCat);
      setNames({ uk: '', en: '' });
      onClose();
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      setError(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const footerContent = (
    <Row justify='between'>
      <Button
        variant="neutral"
        onClick={onClose}
        fullWidth
      >
        {t('common.cancel')}
      </Button>
      <Button 
        variant="primary" 
        onClick={handleSave} 
        isLoading={loading}
        disabled={isInvalid}
        fullWidth
      >
        {t('common.make_category')}
      </Button>
    </Row>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('common.add_cat_label')} 
      width="max-w-md"
      footer={footerContent}
    >
      <Col>
        {error &&
          <Alert variant="error" showIcon={false}>
            {error}
          </Alert>
        }

        <Input 
          label={t('common.cat_name_uk')} 
          value={names.uk} 
          onChange={(e) => setNames({...names, uk: e.target.value})}
          placeholder={t('common.cat_add_placeholder')}
        />

        <Input 
          label={t('common.cat_name_en')} 
          value={names.en} 
          onChange={(e) => setNames({...names, en: e.target.value})}
          placeholder={t('common.cat_add_placeholder')}
        />
      </Col>
    </Modal>
  )
};

export default CategoryModal;
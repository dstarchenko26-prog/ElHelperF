import { useState } from "react";
import { useTranslation } from "react-i18next";

import { getErrorKey } from "@/api/errorHandler";
import { projectService } from "@/api/project";

import { Row, Button, Modal, Col, Alert, Input } from '@/components/ui';

const CreateProjectModal = ({ isOpen, onClose, onSuccess}) => {
  const {t} = useTranslation();

  const [formData, setFormData] = useState({ name: '', description: '' });
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError(t('project.has_name'))
      return;
    }

    setIsSubmitting(true);
    setError('');
  
    try {
      const newProject = await projectService.create(formData);
      setFormData({ name: '', description: '' });
      onSuccess(newProject);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      setError(t(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const footerContent = (
    <Row justify='between'>
      <Button
        variant="neutral"
        onClick={onClose}
        fullWidth
        disabled={isSubmitting}
      >
        {t('common.cancel')}
      </Button>
      <Button 
        variant="success"
        onClick={handleSubmit} 
        isLoading={isSubmitting}
        disabled={!formData.name.trim()}
        fullWidth
      >
        {t('project.create_project')}
      </Button>
    </Row>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('project.new_project_title')}
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
          label={t('project.project_name_label')}
          placeholder={t('project.project_name_placeholder')}
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          autoFocus
        />

        <Input 
          label={t('project.project_desc_label')} 
          placeholder={t('project.project_desc_placeholder')}
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </Col>
    </Modal>
  )
}

export default CreateProjectModal;
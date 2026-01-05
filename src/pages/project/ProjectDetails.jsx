import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { projectService } from '@/api/project';
import { calculationService } from '@/api/calculation';

import CalculationCard from '@/components/project/CalculationCard';
import EditProjectModal from '@/components/modal/EditProjectModal';

import {
  Button, 
  Heading, Text,
  Row, Col, Divider, Container, Grid,
  Spinner,
  ConfirmationModal,
  EmptyState
} from '@/components/ui';

import { 
  ArrowLeft, Edit3, Trash2,
  Calculator, FileSpreadsheet, 
} from 'lucide-react';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteProjModalOpen, setIsDeleteProjModalOpen] = useState(false);
  const [isDeleteCalcModalOpen, setIsDeleteCalcModalOpen] = useState(false);

  const [calcToDelete, setCalcToDelete] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projData, calcData] = await Promise.all([
        projectService.getById(projectId),
        calculationService.getByProject(projectId)
      ]);
      setProject(projData);
      setCalculations(calcData);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleEditSuccess = (updatedProject) => {
    setProject(updatedProject);
  };

  const handleDownloadBom = async () => {
    try {
      alert(t('project.warn_download_bom'))
      await projectService.downloadBom(projectId, project.name);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  };

  const openCalcDelete = (calc) => {
    setCalcToDelete(calc);
    setIsDeleteCalcModalOpen(true);
  }

  const confirmDeleteProject = async () => {
    setIsDeleting(true);
    try {
      await projectService.delete(projectId);
      navigate('/projects')
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setIsDeleting(false);
    }
  }

  const confirmDeleteCalc = async () => {
    try {
      await calculationService.delete(calcToDelete.id);
      fetchData();
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  }

  if (loading) return <div className="flex justify-center p-20"><Spinner size="xl"/></div>;

  if (!project) return (
    <EmptyState
      title={t('project.project_nf')}
    />
  );

  return (
    <Container size='2xl'>
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
      >
        <ArrowLeft size={16} /> {t('common.back')}
      </button>

      <Col>
        <Row wrap justify='between'>
          <Col>
            <Heading variant="h2">{project.name}</Heading>
            <Text className="max-w-2xl">{project.description}</Text>
          </Col>
          <Row justify={{base: 'start', lg: 'end'}}>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(true)}
              title={t('project.redact_btn')}
              leftIcon={<Edit3/>}
            />

            <Button 
              variant="outline" 
              onClick={handleDownloadBom} 
              title={t('project.download_bom')}
              leftIcon={<FileSpreadsheet className="text-green-600"/>}
            >
              <span className="hidden sm:inline">BOM</span>
            </Button>

            <Button 
              variant="outline" 
              onClick={() => setIsDeleteProjModalOpen(true)} 
              title={t('project.delete_btn')}
              disabled={isDeleting}
              leftIcon={<Trash2 className='text-red-600'/>}
            />
          </Row>
        </Row>

        <Divider/>

        <Row justify='between'>
          <Heading variant="h4">
            {`${t('project.count_calculations')} (${calculations.length})`}
          </Heading>
          
          <Button 
            onClick={() => navigate(`/projects/${projectId}/create-calc`)} 
            className="px-6"
          >
            {`+ ${t('project.add_calculation')}`}
          </Button>
        </Row>

        {calculations.length === 0 ? (
          <EmptyState
            title={t('project.no_calculations')}
            description={t('project.no_calculations_subtitle')}
            icon={<Calculator/>}
            action={
              <Button
                variant='neutral'
                onClick={() => navigate(`/projects/${projectId}/create-calc`)}
              >
                {t('project.np_add_calculation')}
              </Button> 
            }
          />
        ) : (
          <Grid cols={{base: 1, lg: 2}}>
            {calculations.map(calc => (
              <CalculationCard calc={calc} projectId={projectId} onDelete={openCalcDelete}/>
            ))}
          </Grid>
        )}
      </Col>

      <EditProjectModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        project={project}
      />

      <ConfirmationModal 
        isOpen={isDeleteProjModalOpen}
        onClose={() => setIsDeleteProjModalOpen(false)}
        onConfirm={confirmDeleteProject}
        title={t('project.conf_del_proj_t')}
        message={`${t('project.conf_del_proj_d')}`}
        confirmText={t('common.y_del')}
        cancelText={t('common.n_save')}
        variant="danger"
      />

      <ConfirmationModal 
        isOpen={isDeleteCalcModalOpen}
        onClose={() => setIsDeleteCalcModalOpen(false)}
        onConfirm={confirmDeleteCalc}
        title={t('project.conf_del_calc_t')}
        message={
          `${t('project.conf_del_calc_q1')} "${calcToDelete?.name}"? ${t('project.conf_del_calc_q2')}`
        }
        confirmText={t('common.y_del')}
        cancelText={t('common.n_save')}
        variant="danger"
      />
    </Container>
  );
};

export default ProjectDetailsPage;
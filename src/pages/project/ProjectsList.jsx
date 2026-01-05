import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { projectService } from '@/api/project';

import ProjectCard from '@/components/project/ProjectCard';
import CreateProjectModal from '@/components/modal/CreateProjectModal';

import { Button, Heading, Row, Spinner, Text, Col, Container, Grid, EmptyState } from '@/components/ui';

import { FolderOpen } from 'lucide-react';

const ProjectsListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getMyProjects();
      setProjects(data);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateSuccess = (newProject) => {
    setIsModalOpen(false);
    navigate(`/projects/${newProject.id}`);
  };

  if (loading) return <div className="flex justify-center p-20"><Spinner size="xl"/></div>;

  return (
    <Container size='2xl'>
      <Row justify="between" align="center" className='mb-4'>
        <Col gap='xs'>
          <Heading variant="h2">{t('project.project_list_title')}</Heading>
          <Text>{t('project.project_list_subtitle')}</Text>
        </Col>
        <Button onClick={() => setIsModalOpen(true)}>
          {`+ ${t('project.add_project')}`}
        </Button>
      </Row>

      {projects.length > 0 ? (
        <Grid cols={{base: 1, md: 2, lg: 3}} gap='lg'>
          {projects.map(p => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              onClick={() => navigate(`/projects/${p.id}`)} 
            />
          ))}
        </Grid>
      ) : (
        <EmptyState
          title={t('project.no_projects')}
          description={t('project.no_project_subtitle')}
          action={
            <Button variant="neutral" onClick={() => setIsModalOpen(true)}>
              {t('project.np_add_project')}
            </Button>
          }
          icon={<FolderOpen/>}
        />
      )}

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </Container>
  );
};

export default ProjectsListPage;
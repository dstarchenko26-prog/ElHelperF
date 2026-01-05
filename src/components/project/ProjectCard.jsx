import { useTranslation } from 'react-i18next';

import {Card, Text, Heading, Row, Col} from '@/components/ui';

import { Calendar, Layers, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const { i18n } = useTranslation();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card 
      onClick={onClick}
      className="group relative"
      variant="blue"
      effect="hover-glow"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Layers size={80} />
      </div>

      <Col gap="md">
        <Heading variant="h4" className="group-hover:text-blue-600 transition-colors line-clamp-1">
          {project.name}
        </Heading>

        <Text variant="muted" className="text-sm line-clamp-2 h-10">
          {project.description}
        </Text>

        <div className="pt-4 border-t dark:border-gray-700 mt-2">
          <Row justify="between" align="center">
            <div className="flex items-center text-gray-400 text-xs gap-1.5">
              <Calendar size={14} />
              {formatDate(project.createdAt)}
            </div>
            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
              <ChevronRight size={20} />
            </div>
          </Row>
        </div>
      </Col>
    </Card>
  );
};

export default ProjectCard;
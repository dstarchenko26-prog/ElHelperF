import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";

import { Card, Col, Heading, Text } from '@/components/ui';

import { Zap } from "lucide-react";

const FormulaCard = ({formula, projectId}) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const lang = i18n.language;

  return (
    <Card 
      key={formula.id}
      onClick={() => navigate(`/projects/${projectId}/${formula.id}`)}
      className="group relative"
      variant="blue"
      effect="hover-glow"
      shadow="sm"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Zap size={60} />
      </div>

      <Col>
        <Heading variant="h4" className="group-hover:text-blue-500 transition-colors">
          {formula.names?.[lang]}
        </Heading>
        <Text variant="caption" className="line-clamp-2">
          {formula.descriptions?.[lang] || t('project.form_no_desc')}
        </Text>
      </Col>       
    </Card>
  )
}

export default FormulaCard;
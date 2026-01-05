import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {Badge, Button, Card, Heading, StatusIcon, Row, Col} from '@/components/ui';

import { Calculator, Trash2 } from "lucide-react";

const CalculationCard = ({calc, projectId, onDelete}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const currentLang = i18n.language;

  const renderResultsPreview = (results) => {
    if (!results || Object.keys(results).length === 0) return t('project.card_no_res_calc');
    
    return Object.entries(results).slice(0, 3).map(([key, val]) => (
      <div key={key} className="flex justify-end gap-2 text-sm">
        <span className="font-medium text-gray-500">{key}:</span>
        <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
          {val < 0.01 ? val.toExponential(2) : val.toFixed(3)}
        </span>
      </div>
    ));
  };

  return(
    <Card 
      key={calc.id}
      variant="blue"
      effect="hover-border"
      className="group"
      onClick={() => navigate(`/projects/${projectId}/${calc.formulaId}/${calc.id}`)}
    >
      <Row justify="between" align="center" wrap>
        <Row className="flex-1 min-w-0">
          <div className="flex-shrink-0">
            <StatusIcon type="pending" shape="rounded" icon={<Calculator/>} />
          </div>
        
          <Col className="min-w-0">
            <Heading variant="h4" className="line-clamp-2">
              {calc.name}
            </Heading>
            <Badge variant="soft" size="sm">
              {calc.categoryName[currentLang]}
            </Badge>
          </Col>
        </Row>

        <Row className="w-full md:w-auto justify-between md:justify-end items-center pl-0 md:pl-4 border-t md:border-t-0 border-gray-100 dark:border-gray-700 pt-3 md:pt-0">        
          <Col className="text-left md:text-right">
            {renderResultsPreview(calc.results)}
          </Col>

          <Button
            size="icon"
            variant="danger"
            className="transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 flex-shrink-0"
            leftIcon={<Trash2 size={18}/>}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(calc);
            }}
          />
        </Row>
      </Row>
    </Card>
  )
}

export default CalculationCard;

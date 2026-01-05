import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Card, Col, Heading, Text, Row } from '@/components/ui';

const MenuItem = ({item}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card 
      key={item.id}
      hoverable
      onClick={() => navigate(item.path)}
      variant={item.variant}
      effect="hover-border"
      className="group h-full"
    >
      <Col gap="lg" className="h-full" justify="between">
        <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-gray-200 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}>
          {item.icon}
        </div>
                
        <Col gap="xs">
          <Heading variant="h3">{item.title}</Heading>
          <Text>
            {item.description}
          </Text>
        </Col>

        <Row align="center" gap="xs" className="text-blue-500 font-medium pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{t('common.continue')}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </Row>
      </Col>
    </Card>
  )
}

export default MenuItem;
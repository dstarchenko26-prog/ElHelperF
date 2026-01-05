import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {Card, Row, Text, Button, Heading, Badge, Grid} from '@/components/ui';

const ShortArticleItem = ({formula}) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  
  const currentLang = i18n.language;
  const altLang = currentLang === 'uk' ? 'en' : 'uk';

  return(
    <Card key={formula.id}>
      <Grid cols={{base: 1, lg: 3}} gap='lg'>
        <Row justify="between" wrap gap="sm" className="lg:col-span-2">
          <Heading variant="h4">{formula.names[currentLang] || formula.names[altLang]}</Heading>
          <Badge size="lg">
            {formula.categoryName[currentLang]}
          </Badge>
          <Text variant="small" align="justify" className="line-clamp-2 w-full">
            {formula.descriptions[currentLang] || formula.descriptions[altLang]}
          </Text>
        </Row>

        <Row justify="end" wrap gap="lg" className="lg:col-span-1">
          <Button 
            variant="neutral" 
            onClick={() => navigate(`/admin/edit-calc/${formula.id}`)}
          >
            {t('common.edit')}
          </Button>

        </Row>
      </Grid>

    </Card>
  )
}

export default ShortArticleItem;
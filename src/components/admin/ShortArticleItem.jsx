import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Card, Row, Button, Heading, Grid, Badge} from '@/components/ui';

const ShortArticleItem = ({article, onDelete}) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  
  const currentLang = i18n.language;
  const altLang = currentLang === 'uk' ? 'en' : 'uk';

  return(
    <Card key={article.id}>
      <Grid cols={{base: 1, lg: 3}} gap='lg'>
        <Row justify="between" wrap gap="lg" className="lg:col-span-2">
          <Heading variant="h4">{article.title[currentLang] || article.title[altLang]}</Heading>
          <Badge size="lg">
            {article.categoryName[currentLang]}
          </Badge>
          <Badge size="lg" color="gray">
            {t('admin.theory.createdAt')}: {new Date(article.createdAt).toLocaleDateString()}
          </Badge>
        </Row>

        <Row justify="end" wrap gap="lg" className="lg:col-span-1">
          <Button 
            variant="neutral" 
            onClick={() => navigate(`/admin/edit-theory/${article.id}`)}
          >
            {t('common.edit')}
          </Button>

          <Button 
            variant="danger" 
            onClick={onDelete}
          >
            {t('common.delete')}
          </Button>

        </Row>
      </Grid>
    </Card>
  )
}

export default ShortArticleItem;
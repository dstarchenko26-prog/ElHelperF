import { useTranslation } from "react-i18next";

import {
  Card, Text, Heading, Badge,
  Col, Row, Divider
} from '@/components/ui';

const ArticleItem = ({article, onClick}) => {
  const { i18n } = useTranslation()

  const currentLang = i18n.language;

  return(
    <Card 
      key={article.id} 
      hoverable 
      onClick={onClick}
      className="h-full border-b-4"
    >
      <Col gap="sm">
        <Heading variant="h4" align="center">{article.title[currentLang]}</Heading>
        <Badge pill variant="solid" color="gray">
          <Text variant="caption" align="center" className="font-bold !text-white">
            {article.categoryName[currentLang]}
          </Text>
        </Badge>
      </Col>

      <Divider/>

      <Row justify="between" align="center">
        <Text variant="caption">
          {new Date(article.updatedAt).toLocaleDateString(currentLang)}
        </Text>
        <Row gap="xs" wrap>
          {article.tags?.slice(0, 2).map(tag => (
            <Badge variant="soft">
              #{tag}
            </Badge>
          ))}
        </Row>
      </Row>
    </Card>
  )
}

export default ArticleItem;
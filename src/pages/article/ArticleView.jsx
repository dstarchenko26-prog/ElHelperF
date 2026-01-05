import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { getErrorKey } from '@/api/errorHandler';
import { wikiService } from '@/api/wiki';

import CommentSection from '@/components/wiki/CommentSection';

import {
  Card, Heading, Text, Badge,
  Divider, Row, Container, Button
} from '@/components/ui';

const ArticleView = () => {
  const { id } = useParams();

  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  
  const currentLang = i18n.language;

  const [article, setArticle] = useState(null);
  
useEffect(() => {
  const fetchArticleData = async () => {
    try {
      const articleData = await wikiService.getArticleById(id);
      setArticle(articleData);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  };

  if (id) fetchArticleData();
}, [id]);

  if (!article) return null;

  return (
    <Container size='full'>
      <Card padding='lg' className='mb-6'>
        <article>
          <Heading variant="h1">
            {article.title[currentLang]}
          </Heading>

          <Row align='center' justify='between' className='mt-4'>
            <Badge>
              {article.categoryName?.[currentLang]}
            </Badge>

            <Row align='end' gap='sm'>
              <Text 
                variant="caption"
                className="font-bold cursor-pointer !text-blue-600 !hover:text-blue-800 hover:underline transition-colors duration-200 ease-in-out !text-base"
                onClick={() => navigate(`/profile/${article.authorId}`)}
              >
                {article.authorName}
              </Text>
              <Divider vertical/>
              <Text variant="body">
                {new Intl.DateTimeFormat(currentLang, { dateStyle: 'long' }).format(new Date(article.updatedAt))}
              </Text>
            </Row>
          </Row>

          <Divider/>

          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {article.content[currentLang]}
            </ReactMarkdown>
          </div>
        </article>
      </Card>

      <Divider />

      <CommentSection articleId = {article.id}></CommentSection>
    </Container>
  );
};

export default ArticleView;
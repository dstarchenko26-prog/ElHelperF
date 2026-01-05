import { useState, useEffect, useMemo } from 'react'; // Додав useMemo
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { wikiService } from '@/api/wiki';
import { categoryService } from '@/api/category';

import ArticleItem from '@/components/wiki/ArticleItem';

import {
  Card, Heading, Text,
  Input, Select,
  Row, Col, Container, Grid,
  Spinner, EmptyState
} from '@/components/ui';

import { Search, SearchX } from 'lucide-react';

const WikiSearch = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language;

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        const params = {
          query: searchTerm,
          categoryId: selectedCategory !== 'all' ? Number(selectedCategory) : null,
          sort: sortBy,
          lang: currentLang
        };

        const data = await wikiService.getArticles(params, abortController.signal);
        setArticles(data || []);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          const errorKey = getErrorKey(error)
          const errorMessage = t(errorKey);
          alert(t(errorMessage));
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => abortController.abort();
  }, [searchTerm, selectedCategory, sortBy, currentLang]);

  const displayArticles = useMemo(() => {
    return articles.filter(article => 
      article.title?.[currentLang] && article.content?.[currentLang]
    );
  }, [articles, currentLang]);

  return (
    <Container size='2xl'>
      <Col gap="lg">
        <Heading variant="h2" align='center'>{t('wiki.search_title')}</Heading>
        
        <Card>
          <Input 
            startIcon={<Search/>}
            placeholder={t('wiki.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Row gap='sm' wrap className='md:flex-nowrap mt-4'>
            <div className="w-full md:w-1/2">
              <Text variant="caption" className="mb-1 block ml-1">{t('wiki.filter_category')}</Text>
              <Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">{t('common.all_categories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.names?.[currentLang]}
                  </option>
                ))}
              </Select>
            </div>

            <div className="w-full md:w-1/2">
              <Text variant="caption" className="mb-1 block ml-1">{t('wiki.sort.sort_by')}</Text>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">{t('wiki.sort.newest')}</option>
                <option value="oldest">{t('wiki.sort.oldest')}</option>
                <option value="title-asc">{t('wiki.sort.title_az')}</option>
                <option value="title-desc">{t('wiki.sort.title_za')}</option>
              </Select>
            </div>
          </Row>
        </Card>

        {loading ? (
          <Col align='center'>
            <Spinner size="lg" />
            <Text>{t('common.loading')}</Text>
          </Col>     
        ) : (
          displayArticles.length > 0 ? (
            <Grid cols={{base: 1, md: 2, lg: 3}} gap='lg'>
              {displayArticles.map(article => (
                <ArticleItem
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/wiki/${article.id}`)}
                />
              ))}
            </Grid>
          ) : (
            <EmptyState
              title={t('wiki.no_results')}
              description={
                searchTerm 
                ? t('wiki.no_results_found') 
                : t('wiki.no_articles_in_lang')
              }
              icon={<SearchX/>}
            />
          )
        )}
      </Col>
    </Container>
  );
};

export default WikiSearch;
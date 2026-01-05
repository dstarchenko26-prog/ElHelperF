import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { wikiService } from '@/api/wiki';
import { categoryService } from '@/api/category';

import ShortArticleItem from '@/components/admin/ShortArticleItem';

import {
  Card, Heading, Text,
  Button, Input, Select,
  Row, Col, Grid, Container,
  Spinner, EmptyState,
  ConfirmationModal
} from '@/components/ui';

import { NotebookPen } from 'lucide-react';

const TheoryManagement = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const currentLang = i18n.language;

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  }

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await wikiService.getArticlesAdmin();
      setArticles(data);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  const openDeleteModal = (article) => {
    setArticleToDelete(article);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      try {
        await wikiService.deleteArticle(articleToDelete.id);
        fetchArticles();
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        alert(t(errorMessage));
      }
    }
  };

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'all' || art.categoryId.toString() === selectedCategory.toString();
    const matchesSearch = (art.title[currentLang] || art.title[currentLang === 'uk' ? 'en' : 'uk']).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container size='2xl'>
      <Col gap="lg">

        <Heading variant="h2">{t('admin.theory.manage_title')}</Heading>
        <Row justify="between">            
          <Text>{t('admin.theory.manage_subtitle')}</Text>
          <Button 
            variant="primary" 
            onClick={() => navigate('/admin/create-theory')}
            className="px-6"
          >
            + {t('admin.theory.add_btn')}
          </Button>
        </Row>

        <Card>
          <Grid cols={{base: 1, lg: 3}} gap='lg'>
            <Col className="lg:col-span-2">
              <Input 
                placeholder={t('admin.theory.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="filled"
              />
            </Col>
            <Col className="lg:col-span-1">
              <Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">{t('common.all_categories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.names?.[currentLang]}</option>
                ))}
              </Select>
            </Col>
          </Grid>
        </Card>

        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t('admin.theory.conf_del_art_t')}
          message={`${t('admin.theory.conf_del_art_q1')} "${articleToDelete?.title[currentLang]}"? ${t('admin.theory.conf_del_art_q2')}`}
          confirmText={t('common.y_del')}
          cancelText={t('common.n_save')}
          variant="danger"
        />

        {loading ? (
          <Col align='center' className='pt-8'>
            <Spinner/>
            <Text>{t('common.loading')}</Text>
          </Col>     
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ShortArticleItem
              article={article}
              onDelete={() => openDeleteModal(article)}
            />
          ))
        ) : (
          <EmptyState
            title={t('admin.theory.no_articles')}
            icon={<NotebookPen/>}
            action={
              <Button
                variant='neutral'
                onClick={() => navigate('/admin/create-theory')}
              >
                + {t('admin.theory.add_btn')}
              </Button>
            }
          />
        )}
      </Col>
    </Container>
  );
};

export default TheoryManagement;
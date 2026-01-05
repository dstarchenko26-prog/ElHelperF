import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { wikiService } from '@/api/wiki';
import { categoryService } from '@/api/category';

import {
  Card, Heading,
  Input, TextArea, Button, Select, LanguageSelector,
  Row, Col, Container
} from '@/components/ui';

import CategoryModal from '@/components/modal/CategoryModal';

import { ArrowLeft } from 'lucide-react';

const CreateTheory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState([]);

  const [activeLang, setActiveLang] = useState('uk');
  const [loading, setLoading] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: { uk: '', en: '' },
    content: { uk: '', en: '' },
    tags: '',
    categoryId: ''
  });

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const cats = await categoryService.getCategories();
        if (cats === undefined) {
          setCategories([])
        }
        setCategories(cats);

        if (isEditMode) {
          const article = await wikiService.getArticleById(id);
          setFormData({
            title: article.title,
            content: article.content,
            tags: article.tags?.join(', ') || '',
            categoryId: article.categoryId
          });
        }
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        alert(t(errorMessage));
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [id, isEditMode]);

  const handleChange = (field, value) => {
    if (field === 'title' || field === 'content') {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [activeLang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasUA = formData.title.uk.trim() && formData.content.uk.trim();
    const hasEN = formData.title.en.trim() && formData.content.en.trim();

    if (!hasUA && !hasEN) {
      alert(t('admin.theory.alert_has'));
      return;
    }

    if (!formData.categoryId) {
      alert(t('admin.theory.alert_cat'));
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t)
    };

    try {
      if (isEditMode) {
        await wikiService.updateArticle(id, payload);
      } else {
        await wikiService.createArticle(payload);
      }
      navigate('/admin/theory');
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size='2xl'>
      <button 
        onClick={() => navigate('/admin/theory')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
      >
        <ArrowLeft size={16} /> {t('common.back')}
      </button>

      <Card padding="lg">
        <form onSubmit={handleSubmit}>
          <Col gap="xl">
            <Row gap="sm" justify='between'>
              <Heading variant="h2">
                {isEditMode ? `✏️ ${t('admin.theory.edit_label')}` : `📚 ${t('admin.theory.new_label')}`}
              </Heading>

              <LanguageSelector 
                value={activeLang}
                onChange={setActiveLang}
                variant='toggle'
              />
            </Row>

            <Input 
              label={`${t('admin.theory.article_title')} (${activeLang.toUpperCase()})`}
              value={formData.title[activeLang]}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />

            <TextArea 
              label={`${t('admin.theory.article_content')} (${activeLang.toUpperCase()})`}
              value={formData.content[activeLang]}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={10}
              required
            />

            <Row gap="md" wrap className="md:flex-nowrap">
              <Select 
                label={t('admin.theory.category')}
                labelAction={
                  <button 
                    type="button" 
                    onClick={() => setIsCatModalOpen(true)}
                    className="text-blue-500 hover:underline"
                  >
                    {`+ ${t('admin.theory.add_category')}`}
                  </button>
                }
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                required
                className='w-full'
              >
                <option value="">{t('admin.theory.choise_category')}</option>
                {categories?.map(c => <option key={c.id} value={c.id}>{c.names?.[activeLang]}</option>)}
              </Select>

              <Input 
                label={t('admin.theory.tags')}
                placeholder={t('admin.theory.tags_placeholder')}
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                className='w-full'
              />
            </Row>

            <Button type="submit" variant="primary" isLoading={loading} fullWidth className="py-4 text-lg">
              {isEditMode ? t('admin.theory.edit_btn') : t('admin.theory.add_btn')}
            </Button>
          </Col>
        </form>
      </Card>

      <CategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)}
        onSuccess={(newCat) => {
          setCategories(prev => [...prev, newCat]);
          setFormData(prev => ({ ...prev, categoryId: newCat.id }));
        }}
      />
    </Container>
  );
};

export default CreateTheory;
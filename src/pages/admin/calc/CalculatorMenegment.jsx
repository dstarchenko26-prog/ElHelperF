import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { formulaService} from '@/api/formula';
import { categoryService } from '@/api/category';

import { useAuth } from '@/context/AuthContext';

import ShortCalcItem from '@/components/admin/ShortCalcItem';

import {
  Card, Heading, Text,
  Button, Select,
  Container, Row, Col,
  Spinner, EmptyState
} from '@/components/ui';

import { Calculator } from 'lucide-react';

const TheoryManagement = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { user } = useAuth()

  const currentLang = i18n.language;

  const [formulas, setFormulas] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
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

  const fetchFormulas = async () => {
    try {
      setLoading(true);
      const data = await formulaService.getFormulasAdmin(user.id);
      setFormulas(data);
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
    fetchFormulas();
  }, []);

  const filteredFormulas = formulas.filter(calc => {
    const matchesCategory = selectedCategory === 'all' || calc.categoryId.toString() === selectedCategory.toString();
    return matchesCategory;
  });

  return (
    <Container size='2xl'>
      <Col gap="lg">

        <Heading variant="h2">{t('admin.calc.manage_title')}</Heading>
        <Row justify="between">            
          <Text>{t('admin.calc.manage_subtitle')}</Text>
          <Button 
            variant="primary" 
            onClick={() => navigate('/admin/create-calc')}
            className="px-6"
          >
            + {t('admin.calc.add_btn')}
          </Button>
        </Row>

        <Card>
          <Select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">{t('common.all_categories')}</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.names?.[currentLang]}</option>
            ))}
          </Select>
        </Card>

        {loading ? (
          <Col align='center' className='pt-6'>
            <Spinner/>
            <Text>{t('common.loading')}</Text>
          </Col>     
        ) : filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula) => (
            <ShortCalcItem
              formula={formula}
            />
          ))
        ) : (
          <EmptyState
            title={t('admin.calc.no_formulas')}
            icon={<Calculator/>}
            action={
              <Button
                variant='neutral'
                onClick={() => navigate('/admin/create-calc')}
              >
                + {t('admin.calc.add_btn')}
              </Button>
            }
          />
        )}
      </Col>
    </Container>
  );
};

export default TheoryManagement;
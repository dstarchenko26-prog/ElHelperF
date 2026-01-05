import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { formulaService } from '@/api/formula';

import { Input, Card, Heading, Text, Spinner, Container, Col, Grid, Select, EmptyState } from '@/components/ui';

import { ArrowLeft } from 'lucide-react';

import FormulaCard from '@/components/project/FormulaCard';

const CreateCalculation = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  
  const [formulas, setFormulas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormulas = async () => {
      setLoading(true);
      try {
        const data = await formulaService.getFormulas()
        setFormulas(data)
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        alert(t(errorMessage));
        setFormulas([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchFormulas();
  }, []);

  const uniqueCategories = useMemo(() => {
    const cats = formulas
      .map(f => f.categoryName?.[currentLang])
      .filter(Boolean);
    return [...new Set(cats)];
  }, [formulas, currentLang]);

  const filteredFormulas = useMemo(() => {
    return formulas.filter(f => {
      const name = f.names?.[currentLang] || f.name || '';
      const desc = f.descriptions?.[currentLang] || '';
      const query = searchTerm.toLowerCase();
      const matchesSearch = name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);

      const catName = f.categoryName?.[currentLang];
      const matchesCategory = selectedCategory === 'all' || catName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [formulas, searchTerm, selectedCategory, currentLang]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <Container size='2xl'>
      <button 
        onClick={() => navigate(`/projects/${projectId}`)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
      >
        <ArrowLeft size={16} /> {t('common.cancel')}
      </button>
      
      <Col>
        <Heading variant="h2">{t('project.ch_form_title')}</Heading>
        <Text>{t('project.ch_form_subtitle')}</Text>
      
        <Card>
          <Grid cols={{base: 1, lg: 3}} gap='lg'>
            <Col className="lg:col-span-2">
              <Input 
                placeholder={t('project.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="filled"
                autoFocus
              />
            </Col>
            <Col className="lg:col-span-1">
              <Select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">{t('common.all_categories')}</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </Col>
          </Grid>
        </Card>
        
        {filteredFormulas.length > 0 ? (
          <Grid cols={{base: 1, md: 2, lg: 3}} gap='lg'>
            {filteredFormulas.map((formula) => (
              <FormulaCard formula={formula} projectId={projectId}/>
            ))}
          </Grid>
        ) : (
          <EmptyState
            title={t('project.no_formulas')}
          />
        )}
      </Col>
    </Container>
  );
};

export default CreateCalculation;
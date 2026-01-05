import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { formulaService } from '@/api/formula';
import { categoryService } from '@/api/category';

import CalcMetadata from '@/components/admin/createCalc/CalcMetadata';
import Scheme from '@/components/admin/createCalc/Scheme';
import Params from '@/components/admin/createCalc/Params';
import Scripts from '@/components/admin/createCalc/Scripts';

import CategoryModal from '@/components/modal/CategoryModal';

import {Container, ConfirmationModal, Button, Heading, Row, Col, Grid, LanguageSelector} from '@/components/ui';

import {
  Zap, 
  List,  
  Lock, 
  ArrowLeft 
} from 'lucide-react';

const UNIT_TEMPLATES = {
  voltage: [
    { name: 'V', mult: 1 }, 
    { name: 'mV', mult: 0.001 }, 
    { name: 'kV', mult: 1000 }
  ],
  resistance: [
    { name: 'Ohm', mult: 1 }, 
    { name: 'kOhm', mult: 1000 }, 
    { name: 'MOhm', mult: 1000000 }
  ],
  current: [
    { name: 'A', mult: 1 }, 
    { name: 'mA', mult: 0.001 }, 
    { name: 'uA', mult: 0.000001 }
  ],
  power: [
    { name: 'W', mult: 1 }, 
    { name: 'mW', mult: 0.001 }, 
    { name: 'kW', mult: 1000 }
  ],
  capacitance: [
    { name: 'F', mult: 1 },
    { name: 'mF', mult: 0.001 },
    { name: 'uF', mult: 1e-6 }, 
    { name: 'nF', mult: 1e-9 }, 
    { name: 'pF', mult: 1e-12 } 
  ],
  inductance: [
    { name: 'H', mult: 1 },
    { name: 'mH', mult: 0.001 },
    { name: 'uH', mult: 1e-6 },
    { name: 'nH', mult: 1e-9 }
  ],
  frequency: [
    { name: 'Hz', mult: 1 },
    { name: 'kHz', mult: 1000 },
    { name: 'MHz', mult: 1000000 },
    { name: 'GHz', mult: 1000000000 }
  ],
  time: [
    { name: 's', mult: 1 },
    { name: 'ms', mult: 0.001 },
    { name: 'us', mult: 1e-6 },
    { name: 'ns', mult: 1e-9 }
  ],
  else: [
    { name: '', mult: 1 }, 
    { name: '%', mult: 0.01 }
  ]
};

const CreateCalculator = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState([]);

  const [activeLang, setActiveLang] = useState('uk');
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formulaData, setFormulaData] = useState({
    names: { uk: '', en: '' },
    descriptions: { uk: '', en: '' },
    categoryId: '',
    schemeUrl: '',
    scripts: [{ target: 'ROOT', expression: '' }],
    parameters: [{ var: '', label: { uk: '', en: '' }, type: 'resistance' }]
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const cats = await categoryService.getCategories();
        if (cats === undefined) {
          setCategories([])
        }
        setCategories(cats);

        if (isEditMode) {
          const formula = await formulaService.getFormula(id);
          setFormulaData({
            names: formula.names,
            descriptions: formula.descriptions,
            categoryId: formula.categoryId,
            schemeUrl: formula.schemeUrl,
            scripts: formula.scripts,
            parameters: formula.parameters
          });
        }
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        alert(t(errorMessage));
      }
    };

    loadInitialData();
  }, [id, isEditMode]);

  const updateLocalization = (field, lang, value) => {
    setFormulaData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const addParameter = () => {
    if (isEditMode) return;
    setFormulaData(prev => ({
      ...prev,
      parameters: [...prev.parameters, { var: '', label: { uk: '', en: '' }, type: 'resistance' }]
    }));
  };

  const updateParameter = (idx, field, value, lang = null) => {
    const newParams = [...formulaData.parameters];
    if (lang) {
      newParams[idx][field] = { ...newParams[idx][field], [lang]: value };
    } else {
      newParams[idx][field] = value;
    }
    setFormulaData(prev => ({ ...prev, parameters: newParams }));
  };

  const addScript = () => {
    if (isEditMode) return;
    setFormulaData(prev => ({
      ...prev,
      scripts: [...prev.scripts, { target: 'ROOT', expression: '' }]
    }));
  };

  const updateScript = (idx, field, value) => {
    if (isEditMode) return;
    const newScripts = [...formulaData.scripts];
    newScripts[idx][field] = value;
    setFormulaData(prev => ({ ...prev, scripts: newScripts }));
  };

  const removeElement = (listName, index) => {
    if (isEditMode) return;
    setFormulaData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const handleConfirmSave = async () => {
    try {
      if (isEditMode) {
        await formulaService.updateFormula(id, {
          names: formulaData.names,
          descriptions: formulaData.descriptions,
          parameters: formulaData.parameters
        });
      } else {
        const payload = {
          ...formulaData,
          parameters: formulaData.parameters.map(p => ({
            var: p.var,
            label: p.label,
            units: UNIT_TEMPLATES[p.type] || UNIT_TEMPLATES.else
          }))
        };
        await formulaService.createFormula(payload);
      }
      navigate('/admin/calc');
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    }
  };

  return (
    <Container size='2xl'>      
      <button 
        onClick={() => navigate('/admin/calc')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2"
      >
        <ArrowLeft size={16} /> {t('common.back')}
      </button>

      <Col gap="xl">

        <Row justify="between">     
          <Heading variant="h2">
            {isEditMode ? `🌐 ${t('admin.calc.edit_label')}` : `🛠️ ${t('admin.calc.new_label')}`}
          </Heading>

          <LanguageSelector 
            value={activeLang}
            onChange={setActiveLang}
            variant='toggle'
          />
        </Row>

        <Grid cols={{base: 1, lg: 3}} gap='lg'>
          <Col className="lg:col-span-2">
            <CalcMetadata 
              activeLang={activeLang} 
              formulaData={formulaData} 
              updateLocalization={updateLocalization} 
              setFormulaData={setFormulaData}
              categories={categories}
              openModal={() => setIsCatModalOpen(true)}
              readOnly={isEditMode}
            />
          </Col>

          <Col className="lg:col-span-1">
            <Scheme 
              formulaData={formulaData} 
              setFormulaData={setFormulaData}
              readOnly={isEditMode}
            />
          </Col>
        </Grid>

        <Col>
          <Row justify="between" align="center">
            <Heading variant="h4" className="flex items-center gap-2">
              <List size={20} className="text-blue-500" /> 
              {t('admin.calc.input_params')} {isEditMode && <Lock size={16} className="text-gray-400" />}
            </Heading>
            {!isEditMode && (
              <Button variant="neutral" size="sm" onClick={addParameter}>
                {`+ ${t('admin.calc.add_input_param')}`}
              </Button>
            )}
          </Row>

          {formulaData.parameters.map((param, idx) => (
            <Params 
              key={idx} 
              param={param} 
              idx={idx} 
              activeLang={activeLang}
              readOnly={isEditMode}
              updateParameter={updateParameter}
              removeElement={removeElement}
              unitTemplates={UNIT_TEMPLATES}
            />
          ))}
        </Col>

        <Col>
          <Row justify="between" align="center">
            <Heading variant="h4" className="flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" /> 
              {t('admin.calc.scripts')} {isEditMode && <Lock size={16} className="text-gray-400" />}
            </Heading>
            {!isEditMode && (
              <Button variant="neutral" size="sm" onClick={addScript}>
                {`+ ${t('admin.calc.add_scripts')}`}
              </Button>
            )}
          </Row>

          {formulaData.scripts.map((script, idx) => (
            <Scripts 
              key={idx} 
              script={script} 
              idx={idx} 
              readOnly={isEditMode}
              updateScript={updateScript}
              removeElement={removeElement}
            />
          ))}
        </Col>

        <Button 
          variant="primary" 
          fullWidth
          className="py-5 text-xl font-black"
          onClick={() => setIsModalOpen(true)}
        > 
          {isEditMode ? t('admin.calc.save_edit') : t('admin.calc.save_new')}
        </Button>
      </Col>

      <CategoryModal 
        isOpen={isCatModalOpen} 
        onClose={() => setIsCatModalOpen(false)}
        onSuccess={(newCat) => {
          setCategories(prev => [...prev, newCat]);
          setFormulaData(prev => ({ ...prev, categoryId: newCat.id }));
        }}
      />

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        title={t('admin.calc.conf_save_calc_t')}
        message={`${t('admin.calc.conf_save_calc_desc')}`}
        confirmText={t('admin.calc.y_save')}
        cancelText={t('admin.calc.n_n_save')}
        variant="danger"
      />
    </Container>
  );
};

export default CreateCalculator;
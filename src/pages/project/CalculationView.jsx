import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Info, AlertTriangle } from 'lucide-react';

import { getErrorKey } from '@/api/errorHandler';
import { formulaService } from '@/api/formula';
import { calculationService } from '@/api/calculation';

import CalcForm from '@/components/project/CalcForm';

import { 
  Card, Button, Heading, Col, Text, Spinner, Container, Input, Badge, 
  EmptyState
} from '@/components/ui';

import { 
  Save, ArrowLeft, RotateCcw, Calculator 
} from 'lucide-react';

const CalculationViewPage = () => {
  const { projectId, formulaId, calcId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const lang = i18n.language;
  const isEditMode = !!calcId;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [calculating, setCalculating] = useState(false);
  
  const [formula, setFormula] = useState(null);
  
  const [calcName, setCalcName] = useState("");
  const [inputs, setInputs] = useState({});       
  const [inputUnits, setInputUnits] = useState({}); 
  
  const [results, setResults] = useState(null);
  const [stdResults, setStdResults] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        let currentFormulaId = formulaId;
        if (isEditMode) {
          const calcData = await calculationService.getById(calcId);
          currentFormulaId = calcData.formulaId;
          setCalcName(calcData.name);
          setInputs(calcData.inputs || {});
          setInputUnits(calcData.inputUnits || {});
          setResults(calcData.results);
          setStdResults(calcData.standardizedResults);
        }

        if (currentFormulaId) {
          const fData = await formulaService.getFormula(currentFormulaId);
          setFormula(fData);
          if (!isEditMode) {
            const defaultUnits = {};
            fData.parameters?.forEach(p => {
              const defaultUnit = p.units?.find(u => u.mult === 1) || p.units?.[0];
              if (defaultUnit) defaultUnits[p.var] = defaultUnit.name;
            });
            setInputUnits(defaultUnits);
            setCalcName(`${t('project.new_prefix')}: ${fData.names[lang] || fData.names['en']}`);
          }
        }
      } catch (error) {
        const errorKey = getErrorKey(error)
        const errorMessage = t(errorKey);
        alert(t(errorMessage));
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [projectId, formulaId, calcId, isEditMode, lang, t]);


  useEffect(() => {
    if (!formula || loading) return;

    if (Object.keys(inputs).length === 0) {
        return;
    }

    const timer = setTimeout(async () => {
      setCalculating(true);
      try {
        const res = await calculationService.testCalculation({
          formulaId: formula.id,
          inputs,
          inputUnits
        });
        setResults(res.results);
        setStdResults(res.standardizedResults);
      } catch (e) {
        // Ignore errors during typing
      } finally {
        setCalculating(false);
      }
    }, 600); 

    return () => clearTimeout(timer);
  }, [inputs, inputUnits, formula, loading]);

  const handleInputChange = (varName, value) => {
    const val = (value === '' || value === null) ? '' : parseFloat(value);
    
    setInputs(prev => {
      const next = { ...prev };
      if (val === '') delete next[varName];
      else next[varName] = val;
      return next;
    });
  };

  const handleUnitChange = (varName, unitName) => {
    setInputUnits(prev => ({ ...prev, [varName]: unitName }));
  };

  const handleReset = () => {
    if (window.confirm(t('project.confirm_reset'))) {
        setInputs({});
        setResults(null);
        setStdResults(null);
    }
  };

  const handleSave = async () => {
    if (!calcName.trim()) return alert(t('project.enter_name'));
    setSaving(true);
    const payload = {
      projectId: parseInt(projectId),
      formulaId: formula.id,
      name: calcName,
      inputs,
      inputUnits,
      results,
      standardizedResults: stdResults
    };
    try {
      if (isEditMode) await calculationService.update(calcId, payload);
      else await calculationService.create(payload);
      navigate(`/projects/${projectId}`);
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t(errorMessage));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  if (!formula) return <EmptyState title={t('project.formula_not_found')} />

  const paramsCount = formula.parameters?.length || 0;
  const inputsCount = Object.keys(inputs).length;
  const isOverConstrained = paramsCount > 0 && inputsCount >= paramsCount;

  return (
    <Container size="2xl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <button onClick={() => navigate(`/projects/${projectId}`)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-2">
            <ArrowLeft size={16} /> {t('common.back')}
          </button>
          <div className="flex items-center gap-3">
            <Heading variant="h2" className="m-0">{formula.names[lang]}</Heading>
            <Badge variant="secondary">{formula.categoryName?.[lang]}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} title={t('project.reset')} disabled={inputsCount === 0} leftIcon={<RotateCcw size={18}/>} />
          <Button loading={saving} onClick={handleSave} leftIcon={<Save size={18}/>} disabled={!calcName || calculating}>
            {isEditMode ? t('project.edit_calc') : t('project.save_calc')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Col className="lg:col-span-1 space-y-6">
          <Card padding="md" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('project.calc_name')}</label>
              <Input value={calcName} onChange={(e) => setCalcName(e.target.value)} placeholder={t('project.calc_name_placeholder')} fullWidth />
            </div>
            <hr className="border-gray-100 dark:border-gray-700"/>
            <Text className="text-gray-600 text-sm">{formula.descriptions[lang]}</Text>
          </Card>
          {formula.schemeUrl && (
            <Card padding="none" className="overflow-hidden bg-white">
              <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                <Heading variant="h5" className="text-xs uppercase font-semibold text-gray-500">{t('project.scheme_title')}</Heading>
              </div>
              <div className="p-6 flex justify-center"><img src={formula.schemeUrl} alt={t('project.scheme_alt')} className="max-h-48 object-contain mix-blend-multiply opacity-90" /></div>
            </Card>
          )}
        </Col>

        <Col className="lg:col-span-2">
          <Card padding="lg" className="relative min-h-[400px] shadow-md border-t-4 border-t-blue-500">
            {calculating && (
              <div className="absolute top-4 right-4 animate-pulse flex items-center gap-2 text-blue-500 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full z-10">
                <Spinner size="xs" /> {t('project.calculating')}...
              </div>
            )}

            {isOverConstrained && (
              <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 flex gap-3 animate-in slide-in-from-top-2">
                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-bold text-amber-800">{t('project.all_param_s')}</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    {t('project.sys_nm_calc')}
                    <br/>
                    <span className="font-semibold underline">{t('project.click_x')}</span> {t('project.click_x_desc')}
                  </p>
                </div>
              </div>
            )}

            {!isOverConstrained && (
              <div className="mb-4 flex items-start gap-2 text-sm text-gray-500">
                <Info size={16} className="mt-0.5 shrink-0 text-blue-400"/>
                <p>{t('project.c_desc')}</p>
              </div>
            )}
                
            <CalcForm 
              formula={formula}
              inputs={inputs}
              inputUnits={inputUnits}
              results={results}
              stdResults={stdResults}
              onInputChange={handleInputChange}
              onUnitChange={handleUnitChange}
              lang={lang}
            />
          </Card>
        </Col>
      </div>
    </Container>
  );
};

export default CalculationViewPage;
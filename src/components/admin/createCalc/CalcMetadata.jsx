import { useTranslation } from 'react-i18next';

import { Card, Col, Heading, Row, Input, Select, TextArea, Text } from '@/components/ui';

import { Settings, Lock } from "lucide-react";

const CalcMetadata = ({ 
  activeLang, 
  formulaData, 
  updateLocalization, 
  setFormulaData,
  categories,
  openModal, 
  readOnly 
}) => {
  const {t} = useTranslation();

  return (
    <Card className="h-full">
      <Col gap="lg" justify='between' fullHeight>
        <Row justify="between" align="center">
          <Heading variant="h4" className="flex items-center gap-2">
            <Settings size={20} className="text-gray-400" /> 
            {t('admin.calc.meta_title')}
          </Heading>
          {readOnly && (
            <Text className="flex items-center gap-2">
              <Lock size={12} />
              {t('admin.calc.read_only')}
            </Text>
          )}
        </Row>
                
        <Input 
          label={`${t('admin.calc.calc_name_label')} (${activeLang.toUpperCase()})`} 
          placeholder={t('admin.calc.calc_name_placeholder')}
          value={formulaData.names[activeLang] || ''}
          onChange={(e) => updateLocalization('names', activeLang, e.target.value)}
          className='w-full'
        />

        <Select
          label={t('admin.calc.category')}
          labelAction={
            !readOnly ? (
              <button 
                type="button" 
                onClick={openModal}
                className="text-blue-500 hover:underline"
              >
                {`+ ${t('admin.calc.add_category')}`}
              </button>
            ) : (
              ''
            )
          }
          value={formulaData.categoryId}
          disabled={readOnly}
          onChange={(e) => setFormulaData({...formulaData, categoryId: e.target.value})}
          className={readOnly ? "w-full opacity-70 cursor-not-allowed" : "w-full"}
          required
        >
          <option value="">{t('admin.calc.choise_category')}</option>
          {categories?.map(c => <option key={c.id} value={c.id}>{c.names?.[activeLang]}</option>)}
        </Select>

        <TextArea
          label={`${t('admin.calc.calc_desc_label')} (${activeLang.toUpperCase()})`}
          value={formulaData.descriptions[activeLang] || ''}
          onChange={(e) => updateLocalization('descriptions', activeLang, e.target.value)}
          placeholder={t('admin.calc.calc_desc_placeholder')}
        />
      </Col>
    </Card>
  );
};

export default CalcMetadata;
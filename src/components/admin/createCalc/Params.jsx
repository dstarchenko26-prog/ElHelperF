import { useTranslation } from 'react-i18next';

import { Card, Row, Input, Select, Button } from '@/components/ui';

import { Trash2, Lock } from "lucide-react";

const Params = ({ 
  param, 
  idx, 
  activeLang, 
  readOnly, 
  updateParameter, 
  removeElement, 
  unitTemplates 
}) => {
  const { t } = useTranslation();

  return (
    <Card 
      className={`border-l-4 transition-all ${
        readOnly 
        ? 'border-gray-400 bg-gray-50/50 opacity-80' 
        : '!border-blue-500 shadow-sm !dark:border-blue-500'
      }`}>
      <Row gap="md" align="end" wrap className="lg:flex-nowrap">
        <div className="flex gap-4 w-full lg:w-auto lg:flex-[2]">
          <Input
            label={t('admin.calc.param_label')}
            placeholder="R1"
            value={param.var}
            disabled={readOnly}
            onChange={(e) => updateParameter(idx, 'var', e.target.value)}
            className={readOnly ? "opacity-70 cursor-not-allowed" : ""}
          />

          <Input 
            label={`${t('admin.calc.param_desc')} (${activeLang.toUpperCase()})`}
            placeholder={t('admin.calc.param_desc_placeholder')} 
            value={param.label[activeLang] || ''}
            onChange={(e) => updateParameter(idx, 'label', e.target.value, activeLang)}
          />
        </div>

        <div className="flex gap-4 w-full lg:w-auto lg:flex-1 items-end">
          <Select 
            label={t('admin.calc.param_type')} 
            value={param.type}
            disabled={readOnly}
            onChange={(e) => updateParameter(idx, 'type', e.target.value)}
            className={readOnly ? "opacity-70 !cursor-not-allowed flex-1 min-w-[150px]" : "flex-1 min-w-[150px]"}
          >
            {Object.keys(unitTemplates).map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </Select>

          {!readOnly ? (
            <Button 
              variant="ghost" 
              className='p-2 mb-[2px] text-gray-300 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500'
              onClick={() => removeElement('parameters', idx)}
              title={t('admin.calc.del_param')}
            >
              <Trash2 size={20} />
            </Button>
          ) : (
            <div className="p-2 mb-[2px] text-gray-300" title={t('admin.calc.param_lock')}>
              <Lock size={18} />
            </div>
          )}
        </div>  
      </Row>
    </Card>
  );
};

export default Params;
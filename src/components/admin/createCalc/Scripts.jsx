import { useTranslation } from 'react-i18next';

import {Card, Row, Input, Button, Col, Text} from '@/components/ui';

import { Trash2, Lock} from "lucide-react";

const Scripts = ({ 
  script, 
  idx, 
  readOnly, 
  updateScript, 
  removeElement 
}) => {
  const { t } = useTranslation();

  return (
    <Card 
      className={`border-l-4 transition-all ${
        readOnly 
        ? 'border-gray-400 bg-gray-50/50 opacity-80' 
        : '!border-yellow-500 shadow-sm !dark:border-yellow-500'
      }`}>
      <Col gap='xs'>
        <Row align='end'>
          <Input 
            label={t('admin.calc.script_label')} 
            placeholder={t('admin.calc.script_placeholder')} 
            value={script.expression}
            disabled={readOnly}
            onChange={(e) => updateScript(idx, 'expression', e.target.value)}
            className={readOnly ? "bg-gray-100 cursor-not-allowed font-mono" : "font-mono"}
          />

          {!readOnly ? (
            <Button 
              variant="ghost" 
              className='p-2 mb-[2px] text-gray-300 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500'
              onClick={() => removeElement('scripts', idx)}
              title={t('admin.calc.del_script')}
            >
              <Trash2 size={20} />
            </Button>
          ) : (
            <div className="p-2 mb-[2px] text-gray-300" title={t('admin.calc.script_lock')}>
              <Lock size={18} />
            </div>
          )}
        </Row>

        {!readOnly && (
          <Text>
            {t('admin.calc.script_desc')}
          </Text>
        )}
      </Col>
    </Card>
  );
};

export default Scripts;
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { getErrorKey } from '@/api/errorHandler';
import { formulaService } from '@/api/formula';

import { Card, Col, Heading, Text, Row, Button, Spinner } from '@/components/ui';

import { ImageIcon, XCircle, Lock, UploadCloud} from "lucide-react";

const Scheme = ({ formulaData, setFormulaData, readOnly }) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(t('admin.calc.itisnt_image'));
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await formulaService.uploadScheme(formData); 
      setFormulaData(prev => ({ ...prev, schemeUrl: response.schemeUrl }));
    } catch (error) {
      const errorKey = getErrorKey(error)
      const errorMessage = t(errorKey);
      alert(t('admin.calc.error_load_scheme'))
      alert(t(errorMessage));
    } finally {
      setIsUploading(false);
      event.target.value = ''; 
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    setFormulaData({ ...formulaData, schemeUrl: '' });
  };

  const triggerFileUpload = () => {
    if (!readOnly && !isUploading && fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  return (
    <Card className="h-full">
      <Col gap="md" justify='between' fullHeight>
        {!readOnly && (
          <Heading variant="h4" className="flex items-center gap-2">
            <ImageIcon size={18} />
            {t('admin.calc.scheme_title')}
          </Heading>
        )}

        {readOnly && (
          <Row justify="between" align="center">
            <ImageIcon size={18} /> 
            <Heading variant="h4">
              {t('admin.calc.scheme_title')}
            </Heading>
            <Lock size={18} className="text-gray-300" />
          </Row>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/png, image/jpeg, image/jpg, image/svg+xml"
        />

        <div className="relative group flex-1 min-h-[200px] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
          
          {isUploading && (
            <Spinner size='lg'/>
          )}

          {formulaData.schemeUrl ? (
            <>
              <img 
                src={formulaData.schemeUrl} 
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]" 
                onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Error+Loading+Image'; }}
              />
              
              {!readOnly && (
                <button 
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white text-red-500 border border-red-100 rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110 z-10"
                  title={t('admin.calc.del_scheme')}
                  type="button"
                >
                  <XCircle size={20} />
                </button>
              )}
            </>
          ) : (
            <div 
              onClick={triggerFileUpload}
              className={`flex flex-col items-center justify-center p-6 text-center h-full w-full ${!readOnly ? 'cursor-pointer' : ''}`}
            >
              <div className="bg-blue-50 text-blue-400 p-4 rounded-full mb-3">
                <ImageIcon size={32} className="stroke-[1.5]" />
              </div>
              <Text className="text-gray-500 font-medium">{t('admin.calc.no_scheme')}</Text>
              {!readOnly && (
                <Text variant="caption" className="text-gray-400 mt-1">
                  {t('admin.calc.click_for_load')}
                </Text>
              )}
            </div>
          )}
        </div>

        {!readOnly && (
          <Button
            onClick={triggerFileUpload}
            disabled={isUploading}
            variant='outline'
            className=''
            leftIcon={
              !isUploading ?
                (<UploadCloud size={18}/>) :
                ('')
            }
          >
            {isUploading ? (
              t('common.loading')
            ) : (
              t('admin.calc.upload')
            )}
          </Button>
        )}
      </Col>
    </Card>
  );
};

export default Scheme;
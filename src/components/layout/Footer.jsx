import { useTranslation } from 'react-i18next';

import { Col, Text, Heading} from '@/components/ui';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 dark:bg-black border-t dark:border-gray-800 py-8 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4">
        <Col align="center" gap="sm">
          
          <Text variant="small" className="uppercase tracking-wider font-semibold text-gray-500">
            Coursework Project
          </Text>
          
          <Heading variant="h6" className="text-white">
            &copy; 2025 elHelper
          </Heading>
          
          <Text variant="small">
            {t('common.welcome')}
          </Text>
          
        </Col>
      </div>
    </footer>
  );
};

export default Footer;
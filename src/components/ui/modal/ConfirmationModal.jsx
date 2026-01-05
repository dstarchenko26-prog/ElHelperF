import Modal from '@/components/ui/modal/Modal'; 
import Button from '@/components/ui/input/Button';
import Row from '@/components/ui/layout/Row';
import { AlertTriangle, Info, CheckCircle, Trash2 } from 'lucide-react';

const VARIANT_CONFIG = {
  danger: {
    icon: Trash2,
    iconColor: 'text-red-600 bg-red-100 dark:bg-red-900/30',
    buttonVariant: 'danger'
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
    buttonVariant: 'warning'
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    buttonVariant: 'primary'
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    buttonVariant: 'success'
  }
};

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  variant = "danger" // danger, warning, info, success
}) => {
  
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;
  const Icon = config.icon;

  const footerContent = (
    <Row justify='between' align='center'>
      <Button 
        variant="neutral"
        onClick={onClose}
        fullWidth
      >
        {cancelText}
      </Button>
      <Button 
        variant={config.buttonVariant} 
        onClick={() => {
          onConfirm();
          onClose();
        }}
        fullWidth
      >
        {confirmText}
      </Button>
    </Row>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title} 
      width="max-w-md"
      footer={footerContent} 
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
        <div className={`p-3 rounded-full shrink-0 ${config.iconColor}`}>
          <Icon size={24} />
        </div>

        <div className="mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
import PropTypes from 'prop-types';
import StatusIcon from '@/components/ui/feedback/StatusIcon';

const VARIANTS = {
  error:   "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
  success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
  info:    "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
};

const ICON_MAPPING = {
  error: 'error',
  success: 'success',
  warning: 'warn',    
  info: 'pending',    
};

const Alert = ({ 
  children, 
  title,             // Опціональний заголовок
  variant = 'error', // error, success, warning, info
  showIcon = true,   // Можливість приховати іконку
  onClose,           // Функція закриття (якщо передана - малюємо хрестик)
  className = '',
  ...props
}) => {

  const containerClasses = `
    relative w-full flex items-center p-2 rounded-lg border
    ${VARIANTS[variant] || VARIANTS.error}
    ${className}
  `;

  return (
    <div className={containerClasses} role="alert" {...props}>
      
      {showIcon && (
        <div className="flex-shrink-0 mr-3">
          <StatusIcon 
            type={ICON_MAPPING[variant]} 
            withBackground={false}
            size="md" 
          />
        </div>
      )}

      <div className="flex-1 pt-0.5"> 
        {title && (
          <h5 className="mb-1 font-medium leading-none tracking-tight">
            {title}
          </h5>
        )}
        <div className="text-sm opacity-90">
          {children}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
  showIcon: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Alert;
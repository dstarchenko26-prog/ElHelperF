import PropTypes from 'prop-types';

const BASE_STYLES = "w-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-all duration-200 focus:outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const VARIANTS = {
  outlined: (error) => `
    border rounded-lg 
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
    }
  `,
  filled: (error) => `
    border-2 rounded-lg 
    ${error
      ? 'bg-red-50 dark:bg-red-900/20 border-red-500 focus:bg-white dark:focus:bg-gray-800'
      : 'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500'
    }
  `,
  flushed: (error) => `
    border-b-2 rounded-none bg-transparent px-0
    ${error
      ? 'border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
    }
  `
};

const Select = ({ 
  label, 
  labelAction,
  error, 
  helperText,
  variant = 'outlined', 
  className = '', 
  children, 
  startIcon,
  id,
  name,
  placeholder,
  ...props 
}) => {
  
  const inputId = id || name;
  const isError = Boolean(error);

  const paddingClass = variant === 'flushed'
    ? `py-2 pr-8 ${startIcon ? 'pl-8' : ''}`
    : `py-2 pr-10 ${startIcon ? 'pl-10' : 'px-4'}`;

  return (
    <div className="w-full">
      {(label || labelAction) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <label 
              htmlFor={inputId} 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1"
            >
              {label}
            </label>
          )}
          {labelAction && (
            <div className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              {labelAction}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {startIcon && (
          <div className={`absolute left-0 top-0 bottom-0 flex items-center justify-center pointer-events-none ${variant === 'flushed' ? 'w-8' : 'w-10 pl-1'} text-gray-500`}>
            {startIcon}
          </div>
        )}

        <select
          id={inputId}
          name={name}
          className={`
            ${BASE_STYLES}
            ${VARIANTS[variant]?.(isError) || VARIANTS.outlined(isError)}
            ${paddingClass}
            ${className}
          `}
          aria-invalid={isError}
          {...props}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {children}
        </select>
        
        <div className={`absolute right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none ${variant === 'flushed' ? 'w-8' : 'w-10 pr-1'} text-gray-500`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isError ? (
        <p className="mt-1.5 text-sm text-red-500 flex items-center animate-fade-in ml-1">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 ml-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  labelAction: PropTypes.node,
  error: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled', 'flushed']),
  className: PropTypes.string,
  children: PropTypes.node,
  startIcon: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;
import PropTypes from 'prop-types';

const BASE_STYLES = "w-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS = {
  outlined: (error) => `
    px-4 py-3 border rounded-lg bg-white dark:bg-gray-800
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
    }
  `,
  filled: (error) => `
    px-4 py-3 border-2 rounded-lg 
    ${error
      ? 'bg-red-50 dark:bg-red-900/20 border-red-500 focus:bg-white dark:focus:bg-gray-800'
      : 'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-blue-500'
    }
  `,
  flushed: (error) => `
    px-0 py-2 border-b-2 rounded-none bg-transparent
    ${error
      ? 'border-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500'
    }
  `
};

const Textarea = ({ 
  label, 
  labelAction, 
  error, 
  helperText,
  variant = 'outlined', 
  className = '', 
  rows = 4, 
  resize = true, 
  id,
  name,
  ...props 
}) => {

  const inputId = id || name;
  const isError = Boolean(error);
  
  const resizeClass = !resize ? 'resize-none' : 'resize-y';

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
      
      <textarea
        id={inputId}
        name={name}
        rows={rows}
        className={`
          ${BASE_STYLES}
          ${VARIANTS[variant]?.(isError) || VARIANTS.outlined(isError)}
          ${resizeClass}
          ${className}
        `}
        aria-invalid={isError}
        aria-describedby={isError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />

      {isError ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500 flex items-center animate-fade-in ml-1">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 ml-1">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  labelAction: PropTypes.node,
  error: PropTypes.string,
  helperText: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled', 'flushed']),
  rows: PropTypes.number,
  resize: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Textarea;
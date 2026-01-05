import PropTypes from 'prop-types';
import Spinner from '@/components/ui/feedback/Spinner';

const BASE_STYLES = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg",
  success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-md hover:shadow-lg",
  danger:  "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg",
  neutral: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-400",
  outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-400",
  ghost:   "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300",
  link:    "bg-transparent text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline p-0 shadow-none h-auto",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm gap-1.5", 
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
  icon: "p-2 w-10 h-10 flex justify-center",
};

const Button = ({ 
  children, 
  variant = 'primary',  //primary
  size = 'md',          //sm, md, lg, icon
  isLoading = false,    
  disabled, 
  fullWidth = false,
  leftIcon,   
  rightIcon,  
  className = '', 
  type = 'button', 
  ...props 
}) => {

  const computedClasses = [
    BASE_STYLES,
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={computedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner 
          size="sm" 
          color="current" 
          className="shrink-0"
        />
      ) : leftIcon ? (
        <span className="shrink-0 flex items-center justify-center">
          {leftIcon}
        </span>
      ) : null}
      
      {children && <span>{children}</span>}

      {!isLoading && rightIcon && (
        <span className="shrink-0 flex items-center justify-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'neutral', 'outline', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
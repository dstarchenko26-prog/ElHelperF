import PropTypes from 'prop-types';

const SIZES = {
  sm: "w-4 h-4",      
  md: "w-8 h-8",      
  lg: "w-12 h-12",    
  xl: "w-16 h-16",   
};

const COLORS = {
  current: "text-current",
  white:   "text-white",
  primary: "text-blue-600 dark:text-blue-500",
  success: "text-green-500",
  warning: "text-orange-500",
  danger:  "text-red-500",
  gray:    "text-gray-500 dark:text-gray-400",
};

const Spinner = ({ 
  size = 'md',        //sm, md, lg, xl
  color = 'current',  //cur, wh, pr, sc, wr, dg, gr
  className = '',
  ...props
}) => {
  
  const sizeClass = SIZES[size] || SIZES.md;
  const colorClass = COLORS[color] || COLORS.primary;

  return (
    <svg 
      className={`animate-spin ${sizeClass} ${colorClass} ${className}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      role="status"      // Важливо для доступності
      aria-label="loading"
      {...props}
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['current', 'white', 'primary', 'success', 'warning', 'danger', 'gray']),
  className: PropTypes.string,
};

export default Spinner;
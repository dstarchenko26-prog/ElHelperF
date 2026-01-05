import PropTypes from 'prop-types';

const PADDINGS = {
  none: '',
  sm: 'p-4',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-10',
};

const SHADOWS = {
  none: 'border border-gray-200 dark:border-gray-700',
  sm: 'shadow-sm border border-gray-100 dark:border-gray-700',
  md: 'shadow-xl border border-gray-100 dark:border-gray-700',
  lg: 'shadow-2xl border border-gray-100 dark:border-gray-700',
};

const COLORS = {
  blue: {
    border: 'border-blue-500 dark:border-blue-400',
    shadow: 'shadow-blue-500/50 dark:shadow-blue-900/60',
    hoverBorder: 'hover:border-blue-500 dark:hover:border-blue-400',
  },
  emerald: {
    border: 'border-emerald-500 dark:border-emerald-400',
    shadow: 'shadow-emerald-500/50 dark:shadow-emerald-900/60',
    hoverBorder: 'hover:border-emerald-500 dark:hover:border-emerald-400',
  },
  yellow: {
    border: 'border-yellow-500 dark:border-yellow-400',
    shadow: 'shadow-yellow-500/50 dark:shadow-yellow-900/60',
    hoverBorder: 'hover:border-yellow-500 dark:hover:border-yellow-400',
  },
  red: {
    border: 'border-red-500 dark:border-red-400',
    shadow: 'shadow-red-500/50 dark:shadow-red-900/60',
    hoverBorder: 'hover:border-red-500 dark:hover:border-red-400',
  },
  gray: {
    border: 'border-gray-400 dark:border-gray-500',
    shadow: 'shadow-gray-400/50 dark:shadow-black/50',
    hoverBorder: 'hover:border-gray-400 dark:hover:border-gray-500',
  }
};

const Card = ({ 
  children, 
  className = '', 
  padding = 'md', 
  shadow = 'md', 
  centered = false,
  variant = 'gray', 
  effect = 'none', 
  onClick,
  ...props 
}) => {

  let effectClasses = '';
  const color = COLORS[variant] || COLORS.gray; 

  switch (effect) {
    case 'hover-border':
      effectClasses = `border-2 border-transparent ${color.hoverBorder} cursor-pointer transition-colors`;
      break;
    
    case 'hover-glow':
      effectClasses = `border border-transparent ${color.hoverBorder} hover:shadow-lg hover:${color.shadow} cursor-pointer transition-all duration-300`;
      break;

    case 'static-border':
      effectClasses = `border-2 ${color.border}`;
      break;

    case 'static-glow':
      effectClasses = `border ${color.border} shadow-lg ${color.shadow}`;
      break;

    default:
      if (onClick) {
        effectClasses = 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-500 border border-transparent transition-colors';
      }
      break;
  }

  const baseShadowClass = (effect.startsWith('static')) ? '' : (SHADOWS[shadow] || SHADOWS.md);

  const classes = [
    'bg-white dark:bg-gray-800',       
    'text-gray-900 dark:text-white',   
    'rounded-2xl',
    'transition-all duration-300',    
    baseShadowClass,
    PADDINGS[padding] || PADDINGS.md,
    centered ? 'flex flex-col items-center text-center' : '',
    effectClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  centered: PropTypes.bool,
  variant: PropTypes.oneOf(['blue', 'emerald', 'yellow', 'red', 'gray']),
  effect: PropTypes.oneOf(['none', 'hover-border', 'hover-glow', 'static-glow', 'static-border']),
  onClick: PropTypes.func,
};

export default Card;
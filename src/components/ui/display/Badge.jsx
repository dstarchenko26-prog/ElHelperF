import PropTypes from 'prop-types';

const VARIANTS = {
  // Soft: Світлий фон, темний текст
  soft: {
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    danger:  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    gray:    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  },
  // Solid: Темний фон, білий текст
  solid: {
    primary: "bg-blue-600 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-yellow-500 text-white",
    danger:  "bg-red-600 text-white",
    gray:    "bg-gray-600 text-white",
  },
  // Outline: Прозорий фон, кольорова рамка
  outline: {
    primary: "bg-transparent border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400",
    success: "bg-transparent border border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400",
    warning: "bg-transparent border border-yellow-600 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400",
    danger:  "bg-transparent border border-red-600 text-red-600 dark:text-red-400 dark:border-red-400",
    gray:    "bg-transparent border border-gray-500 text-gray-600 dark:text-gray-400 dark:border-gray-400",
  }
};

const SIZES = {
  sm: "text-xs px-2 py-0.5", 
  md: "text-sm px-2.5 py-0.5", 
  lg: "text-sm px-3 py-1",
};

const Badge = ({ 
  children, 
  variant = 'soft',   // soft, solid, outline
  color = 'primary',  // primary, success, warning, danger, gray
  size = 'md',        // sm, md, lg
  pill = false,
  className = '',
  ...props
}) => {
  
  const variantStyles = VARIANTS[variant] || VARIANTS.soft;
  const colorClass = variantStyles[color] || variantStyles.primary;
  const sizeClass = SIZES[size] || SIZES.md;
  const roundedClass = pill ? 'rounded-full' : 'rounded-md';

  return (
    <span 
      className={`
        inline-flex items-center justify-center font-medium
        ${colorClass}
        ${sizeClass}
        ${roundedClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['soft', 'solid', 'outline']),
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'gray']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  pill: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
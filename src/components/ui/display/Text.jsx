import PropTypes from 'prop-types';

const VARIANTS = {
  body:    "text-base text-gray-700 dark:text-gray-300", // Звичайний текст
  small:   "text-sm text-gray-600 dark:text-gray-400",   // Дрібніший
  muted:   "text-sm text-gray-500 dark:text-gray-500",   // Сірий (неактивний)
  caption: "text-xs text-gray-400 dark:text-gray-600 !uppercase tracking-wider", // Підписи
  error:   "text-sm text-red-600 dark:text-red-400",     // Помилки
};

const ALIGNMENTS = {
  left:    "text-left",
  center:  "text-center",
  right:   "text-right",
  justify: "text-justify",
};

const WEIGHTS = {
  normal:   "font-normal",
  medium:   "font-medium",
  semibold: "font-semibold",
  bold:     "font-bold",
};

const TRANSFORMS = {
  none:       "normal-case",
  uppercase:  "uppercase",   
  lowercase:  "lowercase",   
  capitalize: "capitalize",  
};

const Text = ({ 
  children, 
  variant = 'body',     // body, small, muted, caption, error
  align = 'left',       // left, center, right, justify
  weight = 'normal',    // normal, medium, semibold, bold
  transform = 'none',   // none, uppercase, lowercase, capitalize
  className = '', 
  as = 'p',
  ...props 
}) => {
  
  const Tag = as;

  const classes = [
    VARIANTS[variant] || VARIANTS.body,
    ALIGNMENTS[align] || ALIGNMENTS.left,
    WEIGHTS[weight],
    TRANSFORMS[transform],
    'transition-colors duration-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['body', 'small', 'muted', 'caption', 'error']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold']),
  transform: PropTypes.oneOf(['none', 'uppercase', 'lowercase', 'capitalize']),
  className: PropTypes.string,
  as: PropTypes.elementType,
};

export default Text;
import PropTypes from 'prop-types';

const VARIANTS = {
  h1: "text-4xl md:text-5xl font-extrabold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold uppercase tracking-wide",
};

const ALIGNMENTS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const COLORS = {
  default: "text-gray-900 dark:text-white",
  primary: "text-blue-600 dark:text-blue-400",
  muted: "text-gray-500 dark:text-gray-400",
  danger: "text-red-600 dark:text-red-400",
};

const Heading = ({ 
  children, 
  variant = 'h2', // h1 - h6
  align = 'left', // left, center, right
  color = 'default',
  className = '', 
  ...props 
}) => {
  
  const Tag = variant;

  const classes = [
    VARIANTS[variant] || VARIANTS.h2,
    ALIGNMENTS[align] || ALIGNMENTS.left,
    COLORS[color] || COLORS.default,
    'transition-colors duration-200',
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  color: PropTypes.oneOf(['default', 'primary', 'muted', 'danger']),
  className: PropTypes.string,
};

export default Heading;
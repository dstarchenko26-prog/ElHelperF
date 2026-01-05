import PropTypes from 'prop-types';

const SIZES = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl' : 'max-w-screen-2xl',
  full: 'max-w-full',
};

const Container = ({ 
  children, 
  size = 'xl',      // sm, md, lg, xl, 2xl, full
  className = '', 
  padding = true,   
  center = true,    
  ...props 
}) => {
  
  const classes = [
    'w-full items-center',
    SIZES[size] || SIZES.xl,
    center ? 'mx-auto' : '',
    padding ? 'px-4 sm:px-6 lg:px-8' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  className: PropTypes.string,
  padding: PropTypes.bool,
  center: PropTypes.bool,
};

export default Container;
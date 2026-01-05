import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ 
  text, 
  align = 'center', // 'start', 'center', 'end'
  vertical = false,
  className = '',
  ...props
}) => {
  
  if (vertical) {
    return (
      <div 
        className={`
          inline-block self-stretch 
          w-px min-h-[1em] 
          bg-gray-200 dark:bg-gray-700 
          mx-2 
          ${className}
        `}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  const lineBaseClass = "h-px w-full bg-gray-200 dark:bg-gray-700";

  if (!text) {
    return (
      <div 
        className={`${lineBaseClass} my-2 ${className}`} 
        role="separator"
        {...props}
      />
    );
  }

  const sideLineClass = "flex-grow h-px bg-gray-300 dark:bg-gray-600";
  
  return (
    <div 
      className={`
        relative flex items-center w-full py-4 
        ${className}
      `} 
      role="separator"
      {...props}
    >
      
      {(align === 'center' || align === 'end') && (
        <div className={sideLineClass}></div>
      )}

      <span className={`
        flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
        ${align === 'center' ? 'px-3' : ''}
        ${align === 'start'  ? 'pr-3' : ''}
        ${align === 'end'    ? 'pl-3' : ''}
      `}>
        {text}
      </span>

      {(align === 'center' || align === 'start') && (
        <div className={sideLineClass}></div>
      )}

    </div>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end']),
  vertical: PropTypes.bool,
  className: PropTypes.string,
};

export default Divider;
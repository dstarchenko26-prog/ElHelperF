import PropTypes from 'prop-types';

const POSITIONS = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_POSITIONS = {
  top:    "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-900",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-900",
  left:   "right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-900",
  right:  "left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-900",
};

const Tooltip = ({ 
  children, 
  content,
  position = 'bottom', 
  className = '',
  delay = true, 
}) => {
  
  if (!content) return children;

  return (
    <div className="relative group inline-block">
      
      {children}

      <div 
        role="tooltip"
        className={`
          absolute z-50 hidden group-hover:block w-max max-w-xs
          px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg
          transition-opacity duration-200 opacity-0 group-hover:opacity-100
          ${POSITIONS[position] || POSITIONS.top}
          ${delay ? 'delay-500' : 'delay-75'} 
          ${className}
        `}
      >
        {content}

        <div 
          className={`
            absolute w-0 h-0 
            border-4 border-transparent 
            ${ARROW_POSITIONS[position] || ARROW_POSITIONS.top}
          `} 
        />
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.bool,
  className: PropTypes.string,
};

export default Tooltip;
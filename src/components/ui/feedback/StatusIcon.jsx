import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const THEME = {
  success: {
    path: "M5 13l4 4L19 7",
    text: "text-green-600 dark:text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  error: {
    path: "M6 18L18 6M6 6l12 12",
    text: "text-red-600 dark:text-red-500",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  warn: {
    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    text: "text-yellow-600 dark:text-yellow-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  pending: {
    path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    text: "text-blue-600 dark:text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  neutral: {
    path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    text: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
  }
};

// 2. Розміри
const SIZES = {
  sm: { wrapper: 'w-8 h-8', icon: 'w-4 h-4' },
  md: { wrapper: 'w-10 h-10', icon: 'w-5 h-5' },
  lg: { wrapper: 'w-12 h-12', icon: 'w-6 h-6' },
  xl: { wrapper: 'w-16 h-16', icon: 'w-8 h-8' },
};

const SHAPES = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-xl',
};

const StatusIcon = ({ 
  type = 'success',     // success, error, warn, pending, neutral
  size = 'md',          // sm, md, lg, xl
  shape = 'circle',     // circle, square, rounded
  icon = null,          // Можна передати свій SVG path (string) або компонент (<Icon />)
  withBackground = true, 
  className = '', 
  ...props 
}) => {
  
  const themeStyle = THEME[type] || THEME.success;
  const sizeConfig = SIZES[size] || SIZES.md;
  const shapeClass = SHAPES[shape] || SHAPES.circle;

  const renderInnerIcon = () => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        className: clsx(
          themeStyle.text,
          withBackground ? sizeConfig.icon : sizeConfig.wrapper,
          icon.props.className
        )
      });
    }

    const pathString = (typeof icon === 'string' ? icon : themeStyle.path);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className={clsx(
          themeStyle.text,
          withBackground ? sizeConfig.icon : sizeConfig.wrapper
        )}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={pathString} />
      </svg>
    );
  };

  if (!withBackground) {
    return (
      <div className={clsx("inline-flex items-center justify-center", className)} {...props}>
        {renderInnerIcon()}
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        "flex items-center justify-center",
        themeStyle.bg,
        shapeClass,
        sizeConfig.wrapper,
        className
      )}
      {...props}
    >
      {renderInnerIcon()}
    </div>
  );
};

StatusIcon.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warn', 'pending', 'neutral']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  withBackground: PropTypes.bool,
  className: PropTypes.string,
};

export default StatusIcon;
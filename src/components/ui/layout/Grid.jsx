import PropTypes from 'prop-types';
import { convertProps } from '@/utils/styleConverter';

const GAPS = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const COLS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const Grid = ({ 
  children, 
  className = '', 
  cols = 1,
  gap = 'md', 
  ...props 
}) => {

  const colClasses = convertProps(COLS, cols);
  const gapClasses = convertProps(GAPS, gap);

  const classes = [
    'grid',
    colClasses,
    gapClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const responsivePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  PropTypes.number
]);

Grid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cols: responsivePropType,
  gap: responsivePropType,
};

export default Grid;
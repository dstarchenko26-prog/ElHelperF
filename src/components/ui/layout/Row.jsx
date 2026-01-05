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

const ALIGNMENTS = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const JUSTIFICATIONS = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const Row = ({ 
  children, 
  className = '',       
  gap = 'md',           // none, xs, sm, md, lg, xl
  align = 'center',     // start, center, end, stretch, baseline
  justify = 'start',    // start, center, end, between, around, evenly
  wrap = false,         // true (перенос), false (в один рядок)
  ...props 
}) => {

  const gapClasses = convertProps(GAPS, gap);
  const alignClasses = convertProps(ALIGNMENTS, align);
  const justifyClasses = convertProps(JUSTIFICATIONS, justify);

  const classes = [
    'flex',
    'flex-row',
    wrap ? 'flex-wrap' : 'flex-nowrap',
    gapClasses,
    alignClasses,
    justifyClasses,
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
  PropTypes.object
]);

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  wrap: PropTypes.bool,
  gap: responsivePropType,
  align: responsivePropType,
  justify: responsivePropType,
};

export default Row;
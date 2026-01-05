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
};


const JUSTIFICATIONS = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const Col = ({ 
  children, 
  className = '', 
  gap = 'md',           // none, xs, sm, md, lg, xl
  align = 'stretch',    // start, center, end, stretch
  justify = 'start',    // start, center, end, between, around, evenly
  fullHeight = false,   // Корисна опція: h-full
  ...props 
}) => {

  const gapClasses = convertProps(GAPS, gap);
  const alignClasses = convertProps(ALIGNMENTS, align);
  const justifyClasses = convertProps(JUSTIFICATIONS, justify);

  const classes = [
    'flex',
    'flex-col',
    fullHeight ? 'h-full' : '',
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

Col.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
  gap: responsivePropType,
  align: responsivePropType,
  justify: responsivePropType,
};

export default Col;
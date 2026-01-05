import PropTypes from 'prop-types';
import StatusIcon from '@/components/ui/feedback/StatusIcon';
import Heading from '@/components/ui/display/Heading';
import Text from '@/components/ui/display/Text';

const DEFAULT_ICON_PATH = "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z";

const EmptyState = ({ 
  title, 
  description, 
  icon,             // Може бути svg path string або компонент
  action,           // Сюди передаємо компонент Button
  fullHeight = false, 
  className = '',
  ...props
}) => {
  
  return (
    <div 
      className={`
        flex flex-col items-center justify-center text-center p-8 
        border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl
        bg-gray-50/50 dark:bg-gray-800/20
        ${fullHeight ? 'h-full min-h-[400px]' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="mb-6">
        <StatusIcon 
          type="neutral"     
          size="xl"          
          shape="circle"     
          withBackground={true}
          icon={icon || DEFAULT_ICON_PATH} 
        />
      </div>

      <div className="max-w-sm mx-auto space-y-2">
        <Heading variant="h4" align="center">
          {title}
        </Heading>

        {description && (
          <Text variant="muted" align="center">
            {description}
          </Text>
        )}
      </div>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  action: PropTypes.node,
  fullHeight: PropTypes.bool,
  className: PropTypes.string,
};

export default EmptyState;
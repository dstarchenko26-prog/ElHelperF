import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/components/ui/feedback/Spinner';
import { useTranslation } from 'react-i18next';

const SIZES = {
  xs: 'w-8 h-8 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-base',
  lg: 'w-24 h-24 text-2xl',
  xl: 'w-32 h-32 text-4xl',
  '2xl': 'w-40 h-40 text-5xl',
};

const SHAPES = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-xl',
};

const UserAvatar = ({ 
  src, 
  alt,                  // Ім'я користувача (для ініціалів)
  size = 'md',          // xs, sm, md, lg, xl, 2xl
  shape = 'circle',     // circle, square, rounded
  editable = false,     // Чи можна змінювати фото
  isUploading = false, 
  onFileSelect,         // Callback: (file) => void
  className = '',
  ...props 
}) => {
  const { t } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef(null);

  const getInitials = () => {
    if (!alt) return '?';
    const parts = alt.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const triggerUpload = () => {
    if (editable && !isUploading) {
      fileInputRef.current.click();
    }
  };

  const containerClasses = [
    'relative inline-flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-gray-700',
    'border border-white dark:border-gray-800 shadow-sm',
    SIZES[size] || SIZES.md,
    SHAPES[shape] || SHAPES.circle,
    editable ? 'cursor-pointer group' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} onClick={triggerUpload} {...props}>
      {isUploading ? (
        <Spinner size="sm" color="current" className="text-gray-500" />
      ) : (src && !imageError) ? (
        <img 
          src={src} 
          alt={alt}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover ${SHAPES[shape] || SHAPES.circle}`}
        />
      ) : (
        <span className="font-bold text-gray-500 dark:text-gray-400 select-none uppercase">
          {getInitials()}
        </span>
      )}

      {editable && !isUploading && (
        <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${SHAPES[shape] || SHAPES.circle}`}>
          <svg className="w-5 h-5 text-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[12px] text-white font-medium uppercase tracking-wide">{t('common.edit_avatar')}</span>
        </div>
      )}

      {editable && (
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />
      )}
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  editable: PropTypes.bool,
  isUploading: PropTypes.bool,
  onFileSelect: PropTypes.func,
  className: PropTypes.string,
};

export default UserAvatar;
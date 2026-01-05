import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  width = 'max-w-lg', 
  className = ''
}) => {
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className={`
          relative z-10 w-full bg-white dark:bg-gray-800 
          rounded-xl shadow-2xl ring-1 ring-black/5
          flex flex-col max-h-[90vh]
          animate-in zoom-in-95 duration-200
          ${width} ${className}
        `}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title || <span className="invisible">Modal</span>} {/* Щоб зберегти висоту хедера */}
          </h3>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className='p-4'>
          {/* <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl shrink-0 flex justify-end gap-3"> */}
            {footer}
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;
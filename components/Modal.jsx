import { motion } from 'framer-motion/dist/framer-motion';
import React, { useEffect } from 'react';
import SVG from 'react-inlinesvg';
import { useModal } from '../context/ModalContext';
import useStopScrolling from '../hooks/useStopScrolling';
import XIcon from '../../../../assets/images/reskin-images/icon--x.svg';

/**
 * Modal component that displays the modal content.
 * It handles the overlay, animation, and close button.
 *
 * @returns {React.ReactNode} Modal component
 */
const Modal = () => {
  const { content, setContent, modalType, modalTitle, titleCallout = 'NEW!' } = useModal();
  const isOnboarding = modalType === 'onboarding';
  const overlayClick = setContent;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOnboarding && event.key === 'Enter') {
        setContent();
      } else if (event.key === 'Escape') {
        setContent();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOnboarding, setContent]);

  useStopScrolling(content);

  if (!content) return null;

  const overlay = isOnboarding ? { background: 'rgba(20, 20, 20, 0.6)' } : { background: 'rgba(139, 127, 219, 0.1)' };

  const closeButton = (
    <button className="flex ml-auto" type="button" onClick={() => setContent(null)} id="modal-close">
      <SVG src={XIcon} />
    </button>
  );

  const contentClasses = isOnboarding
    ? 'bg-white z-50 rounded-lg onbording-modal'
    : 'p-4 bg-white z-50 rounded-lg shadow-lg';

  return (
    <div style={{ zIndex: 100000 }} className="w-screen h-screen fixed pin-l pin-t">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Overlay */}
        <div
          id="modal-overlay"
          onClick={() => overlayClick(null)} // Change this line
          style={overlay}
          className="w-full h-full absolute pin-l pin-t"
          role={isOnboarding ? undefined : 'button'} // Add role "button" for accessibility
          aria-label={isOnboarding ? undefined : 'Close Modal'} // Add aria-label for accessibility
          tabIndex={isOnboarding ? undefined : 0} // Add tabIndex for keyboard focus
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ maxWidth: '600px' }}
          className={contentClasses}
        >
          {isOnboarding ? (
            <div className="modal-header">
              <h3>
                <span className="modal-header__new">{titleCallout}</span> {modalTitle}
              </h3>
              {closeButton}
            </div>
          ) : closeButton}

          {/* Modal Content */}
          {content}
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;

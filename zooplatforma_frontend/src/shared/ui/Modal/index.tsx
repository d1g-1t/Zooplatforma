import React, { useEffect } from 'react';
import { ModalProps } from './types';
import styles from './style.module.scss';
import Button from '../Button';
import Title from '../Title';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isActionButton = false,
}) => {
  const classNames = isActionButton
    ? `${styles[`isActionButton`]} ${styles.modal}`
    : `${styles.modal}`;
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={classNames}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {isActionButton && (
          <div className={styles.modalTitle}>
            <Title level={2}>Питомец с вами?</Title>
          </div>
        )}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        ></button>
        {children}
        {isActionButton && (
          <div className={styles.actionButtonContainer}>
            <Button
              color="primary"
              onClick={() => {
                console.log('Питомец со мной');
              }}
            >
              Да, со мной
            </Button>
            <Button
              color="none-border"
              onClick={() => {
                console.log('Питомец не со мной');
              }}
            >
              Нет, не со мной
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

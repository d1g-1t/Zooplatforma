import React from 'react';
import styles from './style.module.scss';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  color = 'primary',
  type = 'button',
  className,
  style,
}) => {
  const buttonClass = `${styles.button} ${styles[color]} ${className || ''}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';
import styles from './style.module.scss';
import { InputProps } from './types';

const Input: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      type,
      placeholder,
      label,
      className,
      error,
      value,
      classInput,
      style,
      ...rest
    },
    ref
  ) => {


    return (
      <label className={`${className || ''} ${styles['input-container']} `}>
        {label && <span className={styles['input-label']}>{label}</span>}
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          aria-label={label}
          aria-invalid={error ? 'true' : 'false'}
          className={`${styles['input-field']} ${classInput || ''} ${error ? styles['input-error'] : ''}`}
          {...rest}
          value={value}
          style={style}
        />
        {error && (
          <span className={styles['error-message']} role="alert">
            {error}
          </span>
        )}
      </label>
    );


});


export const TextInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input {...props} type="text" />
);

export const PasswordInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input {...props} type="password" />
);

export const EmailInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input {...props} type="email" />
);

export const TelInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input {...props} type="tel" />
);
export const NumberInput: React.FC<Omit<InputProps, 'type'>> = (props) => (
  <Input {...props} type="number" />
);

export default Input;

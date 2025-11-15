import React from 'react';
import styles from './style.module.scss';

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  label: string;
  placeholder?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, placeholder, error, ...rest }, ref) => {
  const id = rest.name || label;

  return (
    <div className={styles.texrtareaGroup}>
      {label && (
        <label className={styles.textareaLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={rest.name}
        className={`${styles.taxtareaField} ${error ? styles.error : ''}`}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {error && <div className={styles.invalidFeedback}>{error}</div>}
    </div>
  );
});

export default Textarea;

import { CheckboxInputProps } from './types';
import styles from './style.module.scss';
import { useState } from 'react';

export const CheckboxInput = ({
  text,
  value,
  disabled,
  onChange,
}: CheckboxInputProps) => {
  const defaultValue: boolean = value ? value : false;
  const [isChecked, setIsChecked] = useState(defaultValue);

  onChange = onChange
    ? onChange
    : () => {
        setIsChecked(!isChecked);
      };

  return (
    <div className={styles.Checkbox}>
      <label className={styles.CheckboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
          className={styles.CheckboxElement}
        />
        <p className={styles.Title}>{text}</p>
      </label>
    </div>
  );
};

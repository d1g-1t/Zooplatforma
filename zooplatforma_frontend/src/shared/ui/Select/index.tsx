import React, { useState, useEffect, useRef, forwardRef } from 'react';
import type { SelectProps } from './types';
import { Option } from './Option';
import ArrowIcon from '../../assets/icons/icon_arrow-down.svg';
import styles from './styles.module.scss';

export const Select = forwardRef<HTMLDivElement | null, SelectProps>(
  ({ label, selected, options, onChange, error }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const rootref = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const { target } = event;
        if (target instanceof Node && !rootref.current?.contains(target)) {
          setIsOpen(false);
        }
      };

      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('click', handleClick);
      };
    }, [isOpen]);

    const handleOptionClick = (value: string) => {
      setIsOpen(false);
      if (onChange) {
        onChange(value);
      }
    };

    const handleSelectClick: React.MouseEventHandler<HTMLDivElement> = () => {
      setIsOpen((prev) => !prev);
    };

    const handleSelectKey: React.KeyboardEventHandler<HTMLDivElement> = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      const selectEl = selectRef.current;
      if (!selectEl) {
        return;
      }
      if (event.key === 'Enter') {
        setIsOpen((prev) => !prev);
      }
    };

    return (
      <div className={styles.SelectWrapper} ref={rootref}>
        <div className={styles.Label}>{label}</div>

        <div className={styles.SelectContainer}>
          <div
            className={`
             ${styles.Select}
             ${isOpen ? styles.open : ''}
             ${error ? styles['Select-error'] : ''}`}
            onClick={handleSelectClick}
            onKeyDown={handleSelectKey}
            role="button"
            ref={selectRef}
            tabIndex={0}
          >
            <span> {selected}</span>

            <div className={styles.IconContainer}>
              <img
                className={styles.ArrowIcon}
                src={ArrowIcon}
                alt="Arrow Icon"
              />
            </div>
          </div>

          {isOpen && (
            <ul className={styles.OptionsList}>
              {options.map((option, index) => (
                <li key={index} className={styles.OptionsListElement}>
                  <Option
                    key={option}
                    value={option}
                    onClick={handleOptionClick}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && (
          <span className={styles['error-message']} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
export default Select;

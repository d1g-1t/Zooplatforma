import { useRef } from 'react';
import { OptionProps } from './types';
import styles from './styles.module.scss';

export const Option = ({ value, onClick }: OptionProps) => {
  const optionRef = useRef<HTMLButtonElement>(null);

  const handleClick =
    (value: string): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      if (onClick) {
        onClick(value);
      }
    };

  const handleKey =
    (value: string): React.KeyboardEventHandler<HTMLButtonElement> =>
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const option = optionRef.current;
      if (!option) return;

      if (document.activeElement === option && event.key === 'Enter') {
        if (onClick) {
          onClick(value);
        }
      }
    };

  return (
    <button
      className={styles.Option}
      value={value}
      onClick={handleClick(value)}
      onKeyDown={handleKey(value)}
      ref={optionRef}
      tabIndex={0}
    >
      {value}
    </button>
  );
};

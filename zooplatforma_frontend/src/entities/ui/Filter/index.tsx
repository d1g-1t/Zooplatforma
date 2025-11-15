import { PropsWithChildren } from 'react';
import { FilterProps } from './types';
import styles from './styles.module.scss';

export const Filter = ({
  children,
  resetCallback,
}: PropsWithChildren<FilterProps>) => {
  return (
    <div className={styles.Filter}>
      <p className={styles.title}>Фильтр</p>
      <div className={styles.filters}>{children}</div>
      <button onClick={resetCallback} className={styles.resetButton}>
        Сбросить фильтр
      </button>
    </div>
  );
};

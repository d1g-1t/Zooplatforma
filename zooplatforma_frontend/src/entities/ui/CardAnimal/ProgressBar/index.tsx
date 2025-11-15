import type { ProgressBarProps } from './types';
import styles from './styles.module.scss';

export const ProgressBar = ({
  progress = 0.0,
  className = '',
  classNameFill = '',
}: ProgressBarProps) => {
  return (
    <div className={`${className} ${styles.ProgressOuter}`}>
      <div
        className={`${classNameFill} ${styles.ProgressInner}`}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

import { MarkingVerificationProps } from './types';
import styles from './style.module.scss';
import IconVerified from '../../../shared/assets/icons/info_success.svg';
import IconUnverified from '../../../shared/assets/icons/icon_info.svg';

export const MarkingVerification = ({
  verified,
  className,
  onClick,
}: MarkingVerificationProps) => {
  return (
    <button
      className={`${styles.MarkingVerification} ${verified && styles.MarkingVerificationVerified} ${className && className}`}
      onClick={onClick}
      type="button"
    >
      <img
        alt={verified ? 'Верифицирован' : 'Не верифицирован'}
        src={verified ? IconVerified : IconUnverified}
        className={styles.Icon}
      />
      <p>{verified ? 'Верифицирован' : 'Не верифицирован'}</p>
    </button>
  );
};

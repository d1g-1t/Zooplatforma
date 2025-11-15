import { PlusButtonProps } from './types';
import styles from './style.module.scss';
import PlusIcon from '../../../shared/assets/icons/icon_plus.svg';
import MinusIcon from '../../../shared/assets/icons/icon_minus.svg';

export const PlusButton = ({ text, onClick, openForm }: PlusButtonProps) => {
  return (
    <button type="button" className={styles.PlusButton} onClick={onClick}>
      {openForm ? (
        <img alt="Добавить" src={MinusIcon} className={styles.PlusIcon} />
      ) : (
        <img alt="Добавить" src={PlusIcon} className={styles.PlusIcon} />
      )}
      {text}
    </button>
  );
};

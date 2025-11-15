import { OptionsButtonProps } from './types';
import styles from './styles.module.scss';
import SettingsIcon from '../../../../shared/assets/icons/icon_settings.svg';

export const OptionsButton = ({ onClick }: OptionsButtonProps) => {
  return (
    <div className={styles.OptionsButton}>
      <button
        className={styles.Icon}
        style={{ backgroundImage: `url(${SettingsIcon})` }}
        onClick={onClick}
      />
    </div>
  );
};

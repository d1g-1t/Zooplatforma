import { VaccinationInputProps, VaccinationType } from './types';
import styles from './style.module.scss';

export const VaccinationInput = ({
  type,
  subject,
  date,
  onEditCallback,
  onDeleteCallback,
  onVerificationButtonCallback,
  verified,
}: VaccinationInputProps) => {
  let vaccinationTypeString = '';
  switch (type) {
    case VaccinationType.Deworming: {
      vaccinationTypeString = 'Обработка';
      break;
    }
    case VaccinationType.Vaccination: {
      vaccinationTypeString = 'Прививка';
      break;
    }
  }
  return (
    <div className={styles.VaccinationInput}>
      <div className={styles.VaccinationData}>
        <span className={styles.VaccinationType}>{vaccinationTypeString}</span>
        <span>·</span>
        <span>{subject}</span>
        <span>·</span>
        <span>{date}</span>
      </div>
      <div className={styles.ControlsSection}>
        {onEditCallback && (
          <button
            type="button"
            className={styles.EditButton}
            onClick={onEditCallback}
          />
        )}
        {onDeleteCallback && (
          <button
            type="button"
            className={styles.DeleteButton}
            onClick={onDeleteCallback}
          />
        )}
        <button
          type="button"
          className={`${styles.VerificationButton} ${verified ? styles.VerificationButtonVerified : styles.VerificationButtonUnverified}`}
          onClick={onVerificationButtonCallback}
        />
      </div>
    </div>
  );
};

import type { FormHeaderProps } from './types';
import styles from './style.module.scss';
import Button from '../../../shared/ui/Button';

export const FormHeader = ({
  title,
  abortTitle,
  submitTitle,
  onSubmit,
  onAbort,
}: FormHeaderProps) => {
  return (
    <div className={styles.FormHeader}>
      <h2 className={styles.Title}>{title}</h2>
      <div className={styles.Buttons}>
        <Button
          color="outline-blue"
          type={'button'}
          onClick={onAbort ? onAbort : () => {}}
          className={styles.AbortButton}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 7,
            paddingBottom: 7,
          }}
        >
          {abortTitle ? abortTitle : 'Отмена'}
        </Button>
        <Button
          color="primary"
          type={'button'}
          onClick={onSubmit ? onSubmit : () => {}}
          className={styles.SubmitButton}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 7,
            paddingBottom: 7,
          }}
        >
          {submitTitle ? submitTitle : 'Подтвердить'}
        </Button>
      </div>
    </div>
  );
};

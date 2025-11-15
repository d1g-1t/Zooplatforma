import { PopupBecomeCuratorProps } from './types';
import Modal from '../../../shared/ui/Modal';
import Title from '../../../shared/ui/Title';
import Button from '../../../shared/ui/Button';
import UploadFile from '../../../entities/ui/UploadFile';
import styles from './style.module.scss';

export const PopupBecomeCurator = ({
  isOpen,
  onClose,
}: PopupBecomeCuratorProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit PopupBecomeCurator');
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.form__container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.container}>
            <Title level={2} className={styles.title_big}>
              Стать куратором
            </Title>
            <p className={styles.title}>
              Пожалуйста, ознакомьтесь с условиями соотрудничества, распечатайте
              и подпишите документ.
            </p>
            <Button onClick={onClose} color="outline-blue">
              Условия соотрудничества.pdf
            </Button>
          </section>

          <section className={styles.container}>
            <p className={styles.title_big}>Паспорт</p>
            <p className={styles.title_gray}>
              Загрузите первую и вторую страницы паспорта.
            </p>
            <UploadFile title="Passport photo" />
            <p className={styles.title}>
              Пожалуйста, не используйте вспышку и/или любой редактор
              фотографий. Углы документа не должны быть обрезаны.
            </p>
            <a href="." className={styles.link}>
              Пример фотографии
            </a>
          </section>

          <section className={styles.container}>
            <p className={styles.title_big}>Договор</p>
            <p className={styles.title_gray}>Отправьте оригинал договора.</p>
            <p className={styles.title}>
              Подписанный оригинал договора необходимо направить по адресу: г.
              Москва, ул. Солженицына, д. 12, стр. 8, офис 4.
            </p>
          </section>

          <section className={styles.button__container}>
            <button className={styles.button__submit} type="submit">
              Отправить заявку
            </button>
            <Button
              className={styles.button__close}
              onClick={onClose}
              color="none-border"
            >
              Отмена
            </Button>
          </section>
        </form>
      </div>
    </Modal>
  );
};

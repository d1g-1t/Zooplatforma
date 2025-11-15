import AppLink from '../AppLink';
import DefaultImage from '../../../shared/assets/icons/image-placeholder.svg';
import styles from './style.module.scss';

type Props = {
  name: string;
  image?: string;
};

const Curator = ({ name, image = DefaultImage }: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.containerImage}
        style={{ backgroundImage: `url(${image})` }}
        aria-label={'image'}
      />
      <div className={styles.containerLink}>
        <p className={styles.name}>{name}</p>
        <AppLink to={'/'} className={styles.linkCurator}>
          Написать куратору
        </AppLink>
      </div>
    </div>
  );
};

export default Curator;

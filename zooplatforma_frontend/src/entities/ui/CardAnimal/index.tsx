import { CardAnimalProps, CardAnimalSize } from './types';
import { ProgressBar } from './ProgressBar';
import styles from './styles.module.scss';
import DefaultImage from '../../../shared/assets/icons/image-placeholder.svg';
import UrgentIcon from '../../../shared/assets/icons/icon_clock-red.svg';
import animalStatus from '../../../shared/utils/animalStatus';
import { Link } from 'react-router-dom';

export const CardAnimal = ({
  title,
  image = DefaultImage,
  size = CardAnimalSize.Small,
  cardStatus,
  progress = 0.0,
  showProgress = false,
  showUrgent = false,
  id,
  // locationState,
  // onClick,
}: CardAnimalProps) => {
  const cardStatusString = cardStatus ? animalStatus(cardStatus) : '';
  return (
    <Link
      to={`/animal-profile/${id}`}
      // state={locationState}
      className={`${styles.Card} ${size == CardAnimalSize.Big ? styles.Big : size == CardAnimalSize.Small ? styles.Small : size == CardAnimalSize.SmallForProfile ? styles.SmallForProfile : ''}`}
    >
      {/* <button
      onClick={onClick}
      className={`${styles.Card} ${size == CardAnimalSize.Big ? styles.Big : size == CardAnimalSize.Small ? styles.Small : size == CardAnimalSize.SmallForProfile ? styles.SmallForProfile : ''}`}
    > */}
      <div className={styles.ImageContainer}>
        <div
          className={styles.Image}
          style={{ backgroundImage: `url(${image})` }}
          aria-label={'image'}
        />
        {showProgress && (
          <ProgressBar className={styles.Progress} progress={progress} />
        )}
        {showUrgent && (
          <img className={styles.UrgentIcon} src={UrgentIcon} alt={'Срочно'} />
        )}
      </div>
      <div className={styles.TitleContainer}>
        <p className={styles.CardStatus}>{cardStatusString}</p>
        <p className={styles.CardTitle}>{title}</p>
      </div>
    </Link>
  );
};

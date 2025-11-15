import styles from './style.module.scss';
import { Pet } from './types';
import DefaultImage from '../../../../shared/assets/icons/image-placeholder.svg';

type Props = {
  currentImage: number;
  allPhotoes: boolean;
  petData: Pet;
};

const Gallery = ({ currentImage, allPhotoes, petData }: Props) => {
  if (!petData.data) {
    return (
      <img src={DefaultImage} className={styles.emptyImage} alt="Пустое фото" />
    );
  }

  return (
    <>
      <img
        className={`${styles.gallery__imageLarge}`}
        src={
          petData.data[currentImage].mainPhoto
            ? petData.data[currentImage].photo
            : petData.data[currentImage].photo
        }
        alt={`Фото ${petData.name}`}
      />
      <ul className={styles.gallery__thumbnails}>
        {petData.data
          .filter((_, index) => index < 4)
          .map((photo, index, arr) => {
            return (
              <li>
                <img
                  className={styles.gallery__image}
                  src={photo.photo}
                  alt={`Фото ${petData.name}`}
                  key={index}
                />
                {arr.length - 1 === index && (
                  <div className={styles.allPhotoes}>
                    <p>
                      {allPhotoes !== false
                        ? 'Свернуть все фото'
                        : 'Развернуть все фото'}
                    </p>
                    <p>
                      {allPhotoes !== false ? '' : `(${petData.data.length})`}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Gallery;

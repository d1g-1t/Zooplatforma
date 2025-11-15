import { CardWithTypeAdvertisement, OptionsForAdvertisement } from './types.ts';
import Title from '../../../../shared/ui/Title';
import styles from './styles.module.css';

export const CardTypeAdvertisement = ({
  img,
  typeOfAdvertisement,
}: CardWithTypeAdvertisement) => {
  let titleText: string;
  let descriptionText: string;
  switch (typeOfAdvertisement) {
    case OptionsForAdvertisement.LookingForHome: {
      titleText = 'Ищет дом';
      descriptionText = 'Найти нового хозяина для животного';
      break;
    }
    case OptionsForAdvertisement.FoundOrMissing: {
      titleText = 'Потерялся / Нашелся';
      descriptionText = 'Объявить о пропаже или нахождении животного';
      break;
    }
    default: {
      titleText = '';
      descriptionText = '';
    }
  }

  const onClick = () => {};

  return (
    <button onClick={onClick} className={`${styles.Card}`}>
      <div className={styles.ImageContainer}>
        <div
          className={styles.Image}
          style={{ backgroundImage: `url(${img})` }}
          aria-label={'image'}
        />
      </div>
      <div className={styles.TitleContainer}>
        <Title level={3} className={styles.CardTitle}>
          {titleText}
        </Title>
        <Title level={3} className={styles.CardDescription}>
          {descriptionText}
        </Title>
      </div>
    </button>
  );
};

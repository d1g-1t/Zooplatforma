import styles from './style.module.scss';
import { SocialCardListFields } from './types';
import { SocialCard } from '../../../features/SocialCard/ui';

export const SocialCardList = (fields: SocialCardListFields) => {
  return (
    <section>
      <h3 className={styles.Title}>{fields.title}</h3>
      <ul className={styles.List}>
        {fields.cards.map((card, index) => (
          <SocialCard key={index} {...card} />
        ))}
      </ul>
    </section>
  );
};

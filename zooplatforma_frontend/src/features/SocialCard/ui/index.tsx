import { SocialCardProps } from './types';
import styles from './style.module.scss';

export const SocialCard = (fields: SocialCardProps) => {
  return (
    <li className={styles.Card}>
      <a
        className={styles.Link}
        href={fields.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {<fields.icon />}
        <div>
          <p className={styles.Counter}>{fields.counter}</p>
          <p className={styles.Text}>{fields.text}</p>
        </div>
      </a>
    </li>
  );
};

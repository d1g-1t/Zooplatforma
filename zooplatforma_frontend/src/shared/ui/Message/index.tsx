import styles from '../Message/style.module.scss';
import Title from '../Title';
import { CSSProperties } from 'react';

type Props = {
  title: string;
  description: string;
  isFullDescription: boolean;
  handleClick: () => void;
};

const Message = ({
  title,
  description,
  isFullDescription,
  handleClick,
}: Props) => {
  const fullDesc: CSSProperties = {
    WebkitBoxOrient: 'vertical',
  };

  const shortDesc: CSSProperties = {
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === ' ') {
      return;
    }
    return;
  };

  return (
    <section className={styles.container}>
      <section className={styles.titleBlock}>
        <Title level={4} className={styles.titleBlockText}>
          {title}
        </Title>
      </section>
      <section className={styles.descriptionBlock}>
        <p
          className={styles.descriptionBlockText}
          style={isFullDescription ? fullDesc : shortDesc}
        >
          {description}
        </p>
        <span
          className={styles.descriptionBlockMore}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {isFullDescription ? 'Скрыть' : 'Подробнее'}
        </span>
      </section>
    </section>
  );
};

export default Message;

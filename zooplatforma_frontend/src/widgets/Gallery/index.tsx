import React from 'react';
import type { GalleryProps } from './types';
import styles from './style.module.scss';
import Title from '../../shared/ui/Title';
import AppLink from '../../shared/ui/AppLink';

export const Gallery: React.FC<GalleryProps> = ({
  title,
  link,
  cardsPerColumn = 4, //по умолчанию
  rowsCount = 1,
  children,
  linkText = 'Все мои объявления',
}) => {
  const cards = React.Children.toArray(children).slice(
    0,
    cardsPerColumn * rowsCount
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.titleGallery}>
        <Title level={2} className={styles.title}>
          {title}
        </Title>
        <AppLink to={link} className={styles.link}>
          {linkText}
        </AppLink>
      </div>
      <div
        className={`${styles.children} ${cardsPerColumn === 3 ? styles.children__big_cards : ''}`}
      >
        {cards}
      </div>
    </div>
  );
};

export default Gallery;

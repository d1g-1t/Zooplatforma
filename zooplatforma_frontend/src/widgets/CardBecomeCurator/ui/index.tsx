import { FC } from 'react';

import s from './style.module.scss';
import { CardBecomeCuratorProps } from './types';
import { titleText, descriptionText, buttonText } from './constants';

import dogImg from './assets/dog.png';
import ArrowRight from './assets/arrowRight.svg?react';

const CardBecomeCurator: FC<CardBecomeCuratorProps> = ({ onClick }) => {
  return (
    <section className={s.card}>
      <h2 className={s.title}>{titleText}</h2>
      <p className={s.description}>{descriptionText}</p>
      <button onClick={onClick} className={s.button}>
        {buttonText}
        <ArrowRight />
      </button>
      <img className={s.image} src={dogImg} alt="dog img" />
    </section>
  );
};

export default CardBecomeCurator;

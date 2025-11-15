import { FC } from 'react';

import s from './style.module.scss';
import { descriptionText, linkRout, linkText, titleText } from './constants';
import { StatisticSectionProps } from './types';

import Title from '../../shared/ui/Title';
import AppLink from '../../shared/ui/AppLink';

import ArrowRight from './assets/arrowRight.svg?react';
import CatImg from './assets/cat.svg?react';

const StatisticSection: FC<StatisticSectionProps> = ({ statistics }) => {
  return (
    <section className={s.mainContainer}>
      <Title level={1} className={s.title}>
        {titleText}
      </Title>
      <p className={s.description}>{descriptionText}</p>
      <div className={s.tables}>
        {statistics.map((data, i) => {
          return (
            <div className={s.table} key={i}>
              <span className={s.counter}>{data.count}</span>
              <p className={s.counterText}>{data.text}</p>
            </div>
          );
        })}
        <CatImg className={s.image} />
      </div>
      <AppLink className={s.link} to={linkRout}>
        {linkText}
        <ArrowRight />
      </AppLink>
    </section>
  );
};

export default StatisticSection;

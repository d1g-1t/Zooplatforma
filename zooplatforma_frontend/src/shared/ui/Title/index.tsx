import React from 'react';
import styles from './style.module.scss';
import { TitleProps } from './types';

const Title: React.FC<TitleProps> = ({ level, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const classNames = `${styles[`h${level}`]} ${className}`;

  return <Tag className={classNames}>{children}</Tag>;
};
export default Title;

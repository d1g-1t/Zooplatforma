import { createRef, PropsWithChildren, useEffect, useState } from 'react';
import type { SliderProps } from './types';
import styles from './styles.module.scss';
import RightIcon from '../../assets/icons/icon_arrow-right.svg';
import LeftIcon from '../../assets/icons/icon_arrow-left.svg';
import AppLink from '../AppLink';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isIterable = (
  item:
    | string
    | number
    | true
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
): item is Iterable<React.ReactNode> => {
  const res: boolean = Symbol.iterator in (item as Iterable<React.ReactNode>);
  return res;
};

export const Slider = ({
  title,
  similarLink,
  children,
  currentWidth,
}: PropsWithChildren<SliderProps>) => {
  const [step, setStep] = useState(0);
  const [leftButtonVisible, setLeftButtonVisible] = useState(true);
  const [rightButtonVisible, setRightButtonVisible] = useState(true);
  const scrollMargin = 4;

  const childrenWrapper = createRef<HTMLDivElement>();

  useEffect(() => {
    if (childrenWrapper.current && children && isIterable(children)) {
      setScrollButtonVisibility(childrenWrapper.current);
      const count = Array.from(children).length;
      const w = childrenWrapper.current.scrollWidth;
      setStep(w / count);
    }
  }, [childrenWrapper, children]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollButtonVisibility(e.currentTarget);
  };

  const setScrollButtonVisibility = (scrollContainer: HTMLDivElement) => {
    if (scrollContainer.scrollLeft <= scrollMargin) {
      setLeftButtonVisible(false);
    } else {
      setLeftButtonVisible(true);
    }
    if (
      scrollContainer.scrollLeft >=
      scrollContainer.scrollWidth - scrollMargin - scrollContainer.clientWidth
    ) {
      setRightButtonVisible(false);
    } else {
      setRightButtonVisible(true);
    }
  };

  const slideLeft = () => {
    if (childrenWrapper.current) {
      childrenWrapper.current.scrollLeft -= step;
    }
  };

  const slideRight = () => {
    if (childrenWrapper.current) {
      childrenWrapper.current.scrollLeft += step;
    }
  };

  return (
    <div className={styles.slider} style={{ width: `${currentWidth}` }}>
      <div className={styles.titleBar}>
        <p className={styles.title}>{title}</p>
        <AppLink to={similarLink}>Все похожие</AppLink>
      </div>
      <div
        onScroll={handleScroll}
        className={styles.children}
        ref={childrenWrapper}
      >
        {children}
      </div>
      {leftButtonVisible && (
        <button
          onClick={slideLeft}
          className={`${styles.button} ${styles.buttonLeft}`}
          style={{ backgroundImage: `url(${LeftIcon})` }}
        />
      )}
      {rightButtonVisible && (
        <button
          onClick={slideRight}
          className={`${styles.button} ${styles.buttonRight}`}
          style={{ backgroundImage: `url(${RightIcon})` }}
        />
      )}
    </div>
  );
};

export default Slider;

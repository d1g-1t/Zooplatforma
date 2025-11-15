import React, { useState } from 'react';
import styles from './style.module.scss';
import { PaginationProps } from './types';
import Button from '../../shared/ui/Button';
import arrowLeft from '../../shared/assets/icons/icon_arrow-left.svg';
import arrowRight from '../../shared/assets/icons/icon_arrow-right.svg';

const Pagination: React.FC<PaginationProps> = ({
  numberOfPages,
  maxPagesToShow = 5,
  variant = 'full',
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const calculatePageRange = (): (number | string)[] => {
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const end = Math.min(numberOfPages, start + maxPagesToShow - 1);

    if (end === numberOfPages) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages: (number | string)[] = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    if (typeof pages[0] === 'number' && pages[0] > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }

    if (
      typeof pages[pages.length - 1] === 'number' &&
      (pages[pages.length - 1] as number) < numberOfPages
    ) {
      pages.push('...');
      pages.push(numberOfPages);
    }

    return pages;
  };
  const pageNumbers = calculatePageRange();

  return variant === 'simple' ? (
    <div className={styles.container__buttons}>
      <Button
        className={styles.button_simple}
        color="grey-text"
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <img src={arrowLeft} alt="Предыдущая страница" />
      </Button>
      {pageNumbers.map((page, index) => {
        return typeof page === 'number' ? (
          <Button
            className={styles.button_simple}
            key={page}
            color={page === currentPage ? 'outline-blue' : 'grey-text'}
            type="button"
            onClick={() => handleClick(page)}
          >
            {page.toString()}
          </Button>
        ) : (
          <div key={`ellipsis-${index}`} className={styles.ellipsis}>
            {page}
          </div>
        );
      })}
      <Button
        className={styles.button_simple}
        color="grey-text"
        type="button"
        onClick={handleNext}
        disabled={currentPage === numberOfPages}
      >
        <img src={arrowRight} alt="Следующая страница" />
      </Button>
    </div>
  ) : (
    <div className={styles.container_full}>
      <div className={styles.container__buttons}>
        <Button
          className={styles.button}
          color="grey-text"
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <img src={arrowLeft} alt="Предыдущая страница" />
        </Button>
        {pageNumbers.map((page, index) => {
          return typeof page === 'number' ? (
            <Button
              className={styles.button}
              key={page}
              color={page === currentPage ? 'outline-blue' : 'grey-text'}
              type="button"
              onClick={() => handleClick(page)}
            >
              {page.toString()}
            </Button>
          ) : (
            <div key={`ellipsis-${index}`} className={styles.ellipsis}>
              {page}
            </div>
          );
        })}
        <Button
          className={styles.button}
          color="grey-text"
          type="button"
          onClick={handleNext}
          disabled={currentPage === numberOfPages}
        >
          <img src={arrowRight} alt="Следующая страница" />
        </Button>
      </div>
      <p className={styles.counter}>
        {/*здесь в дальнейшем должен быть счетчик карточек на странице  */}1 -18
        из 184
      </p>
    </div>
  );
};

export default Pagination;

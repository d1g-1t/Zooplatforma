import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { BreadcrumbsProps } from './types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <ul className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) =>
        index + 1 === crumbs.length ? (
          <li key={index} className={styles.active}>
            {crumb.label}
          </li>
        ) : (
          <li key={index} className={styles.linkWrapper}>
            <Link to={crumb.path} className={styles.link}>
              {crumb.label}
            </Link>
            <span className={styles.separator}> &gt; </span>
          </li>
        )
      )}
    </ul>
  );
};
export default Breadcrumbs;

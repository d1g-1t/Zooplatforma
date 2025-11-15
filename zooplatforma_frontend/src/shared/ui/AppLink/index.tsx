import React from 'react';
import { Link } from 'react-router-dom';
import { AppLinkProps } from './types';
import styles from './style.module.scss';

const AppLink: React.FC<AppLinkProps> = ({ className, children, ...props }) => {
  return (
    <Link className={`${styles.appLink} ${className}`} {...props}>
      {children}
    </Link>
  );
};

export default AppLink;

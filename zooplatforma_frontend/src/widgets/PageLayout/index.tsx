import { FC } from 'react';

import s from './style.module.scss';

import Sidebar from '../Sidebar/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import DefaultHeader from '../Header/DefaultHeader/index';

import { favorites, favCount } from './constants';
import { PageLayoutProps } from './types';

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={s.layoutWrapper}>
      <Sidebar favorites={favorites} favoritesCount={favCount} />
      <div className={s.layoutContainer}>
        <Header>
          <DefaultHeader />
        </Header>
        <div className={s.pageWrapper}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

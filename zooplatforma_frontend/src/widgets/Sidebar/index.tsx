import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  favoritesTitle,
  linksData1,
  linksData2,
  linksData2Title,
  linksData3,
  linksData3Title,
  linksData4,
  ourLocation,
} from './constants';
import s from './style.module.scss';
import { Favorite, SidebarProps } from './types';

import NavigationList from '../../entities/ui/NavigationList';
import HideButton from './ui/HideButton';

import LogoMini from '../../shared/assets/icons/favicon.svg';
import IconSample from '../../shared/assets/icons/icon-placeholder.svg?react';
import Logo from '../../shared/assets/icons/logo.svg';

const Sidebar = ({ favoritesCount, favorites }: SidebarProps) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const onHideToggle = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`${s.sidebar} ${isMinimized ? s.minimized : s.expanded}`}>
      <div className={s.header}>
        {isMinimized ? (
          <img
            className={s.logoMini}
            src={LogoMini}
            alt="Логотип Зооплатформа"
          />
        ) : (
          <img className={s.logo} src={Logo} alt="Логотип Зооплатформа" />
        )}
        <HideButton
          active={isMinimized}
          className={s.hideButton}
          onClick={onHideToggle}
        />
      </div>
      <div className={s.navLists}>
        <NavigationList minimized={isMinimized} items={linksData1} />
        <NavigationList
          minimized={isMinimized}
          title={isMinimized ? '' : linksData2Title}
          items={linksData2}
        />
        <NavigationList
          minimized={isMinimized}
          title={isMinimized ? '' : `${favoritesTitle} (${favoritesCount})`}
          items={favorites.map((item: Favorite) => {
            return {
              text: item.name,
              href: item.url,
              Icon: IconSample,
            };
          })}
        />
        <NavigationList
          minimized={isMinimized}
          title={isMinimized ? '' : linksData3Title}
          items={linksData3}
        />
        {isMinimized ? (
          ''
        ) : (
          <div className={s.container}>
            {linksData4.map((data) => {
              return (
                <NavLink className={s.link} to={data.href} caseSensitive>
                  {data.text}
                </NavLink>
              );
            })}
            <NavLink
              className={`${s.link} ${s.linkColorBlue}`}
              to={ourLocation.href}
              caseSensitive
            >
              {ourLocation.text}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

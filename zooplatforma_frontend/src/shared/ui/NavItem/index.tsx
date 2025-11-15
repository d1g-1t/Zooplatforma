import { NavLink, type NavLinkRenderProps } from 'react-router-dom';

import s from './styles.module.scss';
import { NavItemProps } from './types';

import DefaultIcon from '../../assets/icons/icon-placeholder.svg?react';

export const NavItem = ({
  text,
  href,
  end = false,
  caseSensitive = false,
  Icon = DefaultIcon,
  className,
}: NavItemProps) => {
  return (
    <NavLink
      to={href}
      end={end}
      caseSensitive={caseSensitive}
      className={(navData: NavLinkRenderProps) =>
        navData.isActive
          ? `${s.navItem} ${s.active} ${className}`
          : `${s.navItem} ${className}`
      }
    >
      <Icon></Icon>
      {text}
    </NavLink>
  );
};

export default NavItem;

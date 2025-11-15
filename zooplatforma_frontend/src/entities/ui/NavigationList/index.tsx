import { FC } from 'react';

import s from './style.module.scss';
import { NavigationListProps } from './types';

import NavItem from '../../../shared/ui/NavItem';

const NavigationList: FC<NavigationListProps> = ({
  minimized,
  title,
  items,
}) => {
  return (
    <nav className={`${s.navListWrapper} `}>
      {title && <h3 className={s.title}>{title}</h3>}
      <ul className={s.navList}>
        {items.map((item, index) => (
          <li key={index}>
            <NavItem
              text={minimized ? '' : item.text}
              href={item.href}
              end={item.end}
              caseSensitive={item.caseSensitive}
              Icon={item.Icon}
              className={minimized ? s.iconCentered : ''}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationList;

import { NavItemProps } from '../../../shared/ui/NavItem/types';

export interface NavigationListProps {
  minimized: boolean;
  title?: string;
  items: NavItemProps[];
}

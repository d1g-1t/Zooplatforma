import { FC } from 'react';

export type NavItemProps = {
  text?: string;
  Icon?: FC;
  href: string;
  end?: boolean;
  caseSensitive?: boolean;
  className?: string;
};

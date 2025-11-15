import s from './style.module.scss';

import { HideButtonProps } from './types';

import ArrowIcon from '../../../../shared/assets/icons/icon_arrow-left.svg';

const HideButton = ({ active, onClick, className }: HideButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${s.hideButton} ${className ? className : ''}`}
    >
      <img
        alt="hide button"
        src={ArrowIcon}
        className={active ? s.inactive : s.active}
      />
    </button>
  );
};

export default HideButton;

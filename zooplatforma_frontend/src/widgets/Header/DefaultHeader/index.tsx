import { ChangeEvent } from 'react';
import s from './style.module.scss';
import { HeaderProps } from './types';
import { inputPlaceHolder } from '../constants';

import IconSample from '../../../../src/shared/assets/icons/icon_icon-placeholder.svg?react';
import IconAvatar from '../../../shared/assets/icons/icon_user-avatar.svg?react';
import iconPlus from '../../../shared/assets/icons/icon_plus_header.svg';
import { useSelector } from 'react-redux';
import { user } from '../../../store/reducers/userSlice';
import Button from '../../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';

const DefaultHeader = ({ onSearch, onCreateClick }: HeaderProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };
  const isAuth = useSelector(user);
  const navigate = useNavigate();
  const handleAuth = () => {
    navigate('authorization');
  };
  const handleSignUp = () => {
    navigate('signup');
  };
  return (
    <header className={s.header}>
      <label className={s.inputWrapper}>
        {''}
        <IconSample />
        <input
          className={s.input}
          type="search"
          placeholder={inputPlaceHolder}
          onChange={handleSearch}
        />
      </label>
      <div className={s.actionsWrapper}>
        {isAuth ? (
          <>
            <button onClick={onCreateClick} className={s.buttonCreate}>
              <img src={iconPlus} alt="icon create" className={s.iconButton} />
              Создать
            </button>
            <div className={s.actionsContainer}>
              <IconSample />
              <IconSample />
            </div>
            <button className={s.buttonAvatar}>
              <IconAvatar />
            </button>
          </>
        ) : (
          <>
            <Button onClick={handleAuth} color={'outline-blue'}>
              Авторизация
            </Button>
            <Button onClick={handleSignUp} color={'outline-blue'}>
              Регистрация
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default DefaultHeader;

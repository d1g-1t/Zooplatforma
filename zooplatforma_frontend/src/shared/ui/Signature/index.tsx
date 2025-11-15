import React from 'react';
import styles from './style.module.scss';
import { SignatureProps } from './types';

import defaultUserAvatar from '../../assets/icons/icon_user-avatar.svg';
import checkMark from '../../assets/icons/icon_authorization_check.svg';

const Signature: React.FC<SignatureProps> = ({
  userName,
  userRole,
  userAvatar,
  verified,
}) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={userAvatar || defaultUserAvatar}
        alt="Фото пользователя"
      />

      <div className={styles.userInfo}>
        <span className={styles.userName}>{userName}</span>
        {verified ? (
          <img
            className={styles.check}
            src={checkMark}
            alt="галочка авторизации"
          />
        ) : (
          <></>
        )}
        <span className={styles.userRole}>{userRole}</span>
      </div>
    </div>
  );
};
export default Signature;

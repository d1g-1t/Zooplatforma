import { FC } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';
import relativeTime from 'dayjs/plugin/relativeTime';

import s from './style.module.scss';
import { CommentProps } from './types';

import Signature from '../../shared/ui/Signature';
import Button from '../../shared/ui/Button';

import defaultUserAvatar from '../../shared/assets/icons/icon_user-avatar.svg';
import buttonPlaceholder from '../../shared/assets/icons/icon_icon-placeholder.svg';

const Comment: FC<CommentProps> = ({
  likesNumber,
  date,
  text,
  isLast,
  author,
}) => {
  dayjs.extend(relativeTime).locale('ru');
  const commentRelativeTime = dayjs(date).fromNow();

  return (
    <div className={s.container}>
      <Signature
        userName={`${author.firstName} ${author.lastName}`}
        userRole={author.role}
        userAvatar={defaultUserAvatar}
        verified={author.verified}
      />
      <time className={s.container__time}>{commentRelativeTime}</time>
      <p className={s.text}>{text}</p>
      <div
        className={`${s.container__lowerPart} ${isLast ? s.container__lowerPart_last : ''}`}
      >
        <div className={s.container__likes}>
          <Button
            type="button"
            className={s.likeButton}
            color="none-border"
            onClick={() => {}}
          >
            <img src={buttonPlaceholder} alt="кнопка лайка" />
            {likesNumber}
          </Button>
        </div>
        <div className={s.container__answer}>
          <Button
            type="button"
            className={s.answerButton}
            color="none-border"
            onClick={() => {}}
            disabled={false}
          >
            <img src={buttonPlaceholder} alt="кнопка Ответа" />
            Ответить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;

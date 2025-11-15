import { ChangeEvent, FC, useEffect, useReducer, useState } from 'react';

import s from './style.module.scss';
import { CommentsProps, selectType } from './types';
import {
  buttonMoreText,
  title,
  sorterOptions,
  sorterDefaultOption,
  inputPlaceholder,
} from './constants';
import sorterReducer from './reducers/sorterReducer';

import { TextInput } from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import Comment from '../Comment';

import IconMore from './assets/icon_button_more.svg?react';
import IconSelect from './assets/icon_select.svg?react';

const Comments: FC<CommentsProps> = ({
  comments,
  initialCommentsCount = 2,
  moreCommentsCount = 2,
}) => {
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState(sorterDefaultOption.name);
  const [sortedComments, sorterDispatch] = useReducer(sorterReducer, comments);
  const sortedAndNotAllComments = sortedComments.slice(0, commentsCount);

  useEffect(() => {
    sorterDispatch({ type: selectValue });
  }, [selectValue]);

  const handleMoreClick = () => {
    setCommentsCount(commentsCount + moreCommentsCount);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value as selectType);
  };

  return (
    <div className={s.comments}>
      <div className={s.header}>
        <h2 className={s.title}>
          {title}
          <span className={s.number}>{` (${comments.length}) `}</span>
        </h2>
        <div className={s.selectWrapper}>
          <select
            className={s.select}
            onChange={handleSelect}
            value={selectValue}
          >
            {sorterOptions.map((option, i) => {
              return (
                <option key={i} value={option.name}>
                  {option.text}
                </option>
              );
            })}
          </select>
          <div className={s.selectIconWrapper}>
            <IconSelect />
          </div>
        </div>
      </div>
      <TextInput
        name=""
        className={s.input}
        value={inputValue}
        onChange={handleInput}
        error=""
        placeholder={inputPlaceholder}
      />
      <ul className={s.items}>
        {sortedAndNotAllComments.map((comment, i) => {
          return (
            <li className={s.item} key={comment.id}>
              <Comment
                likesNumber={comment.likesNumber}
                date={comment.date}
                text={comment.text}
                author={comment.author}
                isLast={sortedAndNotAllComments.length === i + 1 ? true : false}
              />
            </li>
          );
        })}
      </ul>
      <Button
        className={s.buttonMore}
        onClick={handleMoreClick}
        color={'bg-grey'}
      >
        <IconMore></IconMore>
        {buttonMoreText}
      </Button>
    </div>
  );
};

export default Comments;

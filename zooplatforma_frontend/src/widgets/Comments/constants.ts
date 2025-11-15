import { sorterOptionType } from './types';

export const buttonMoreText = 'Загрузить больше комментариев';

export const title = 'Комментарии';

export const sorterOptions: sorterOptionType[] = [
  { name: 'NEW', text: 'Сначала новые' },
  { name: 'OLD', text: 'Сначала старые' },
  { name: 'POPULAR', text: 'Сначала популярные' },
  { name: 'NOT_POPULAR', text: 'Сначала непопулярные' },
];

export const sorterDefaultOption: sorterOptionType = {
  name: 'NOT_POPULAR',
  text: 'Сначала непопулярные',
};

export const inputPlaceholder = 'Ваш комментарий';

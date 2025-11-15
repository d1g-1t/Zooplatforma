import { Statistic } from './types';

export const titleText = 'Заголовок';

export const descriptionText =
  'Краткое описание проекта и, возможно, его целей для обозначения главной информации новым пользователям';

export const linkText = 'Вся статистика проекта';

export const linkRout = '/statistics';

export const statistics: Statistic[] = [
  { count: '7 981', text: 'животных спасено' },
  { count: '10 478 127 ₽ ', text: 'собрано пожертвований' },
  { count: '2 593', text: 'кураторов подключено' },
];

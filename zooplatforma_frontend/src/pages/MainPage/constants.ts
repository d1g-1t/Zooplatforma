import {
  CardAnimalStatus,
  CardAnimalSize,
} from '../../entities/ui/CardAnimal/types';
import FacebookIcon from '../../shared/assets/icons/icon_facebook.svg?react';
import TelegramIcon from '../../shared/assets/icons/icon_telegram.svg?react';
import YTIcon from '../../shared/assets/icons/icon_youtube.svg?react';

export const statistics = [
  { count: '7 981', text: 'животных спасено' },
  { count: '10 478 127 ₽ ', text: 'собрано пожертвований' },
  { count: '2 593', text: 'кураторов подключено' },
];

export const newAnnouncementsTitle = 'Новые объявления';

export const newAnnouncementsLinkRout = '/new-announcements';

export const newAnnouncementsLinkText = 'Все новые';

export const fundraisingTitle = 'Осталось еще немного';

export const fundraisingLinkRout = '/fundraising';

export const fundraisingLinkText = 'Все похожие';

export const lookingForAHomeTitle = 'Ищут новый дом';

export const lookingForAHomeLinkRout = '/looking-for-a-home';

export const lookingForAHomeLinkText = 'Все похожие';

export const lostTitle = 'Потерялись';

export const lostLinkRout = '/lost';

export const lostLinkText = 'Все похожие';

export const foundTitle = 'Нашлись';

export const foundLinkRout = '/found';

export const foundLinkText = 'Все похожие';

export const cardsData = [
  {
    id: 1,
    title: 'Микаса',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Микаса');
    },
  },
  {
    id: 2,
    title: 'Микас',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Микас');
    },
  },
  {
    id: 3,
    title: 'Мика',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Мика');
    },
  },
  {
    id: 4,
    title: 'Мик',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Мик');
    },
  },
  {
    id: 5,
    title: 'Ми',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Ми');
    },
  },
  {
    id: 6,
    title: 'Армин',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Армин');
    },
  },
  {
    id: 7,
    title: 'Арми',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Арми');
    },
  },
  {
    id: 8,
    title: 'Арм',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    cardStatus: CardAnimalStatus.Urgent,
    progress: 0.25,
    showProgress: true,
    size: CardAnimalSize.Small,
    onClick: () => {
      console.log('Clicked on Арм');
    },
  },
];

export const socialCardListData = {
  title: 'Мы в социальных сетях',
  cards: [
    {
      icon: FacebookIcon,
      counter: 20000,
      text: 'Подписчиков',
      url: 'https://google.com',
    },
    {
      icon: TelegramIcon,
      counter: 20000,
      text: 'Подписчиков',
      url: 'https://google.com',
    },
    {
      icon: YTIcon,
      counter: 20000,
      text: 'Подписчиков',
      url: 'https://google.com',
    },
    {
      icon: YTIcon,
      counter: 20000,
      text: 'Подписчиков',
      url: 'https://google.com',
    },
  ],
};

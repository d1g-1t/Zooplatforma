import { Meta, StoryObj } from '@storybook/react';
import Comments from './index';
import { CommentsProps } from './types';

const meta: Meta<CommentsProps> = {
  title: 'Widgets/Comments',
  component: Comments,
};

export default meta;

type Story = StoryObj<CommentsProps>;

export const Default: Story = {
  args: {
    comments: [
      {
        id: 1,
        likesNumber: 5,
        date: 'October 14, 2024 14:24:00',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam culpa et alias ab quisquam ad, fugit adipisci facere minus, repellendus molestiae beatae unde corrupti tenetur voluptate veniam dolore, ratione quaerat?',
        author: {
          firstName: 'Ваня',
          lastName: 'Абрамов',
          role: 'Пользователь',
          avatar: 'linkToAvatar',
          verified: false,
        },
      },
      {
        id: 2,
        likesNumber: 11,
        date: 'September 28, 2024 5:24:00',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam culpa et alias ab quisquam ad, fugit adipisci facere minus, repellendus molestiae beatae unde corrupti tenetur voluptate veniam dolore, ratione quaerat?',
        author: {
          firstName: 'Екатерина',
          lastName: 'Дроздова',
          role: 'Куратор',
          avatar: 'linkToAvatar',
          verified: true,
        },
      },
      {
        id: 3,
        likesNumber: 0,
        date: 'March 3, 2024 23:24:00',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam culpa et alias ab quisquam ad, fugit adipisci facere minus, repellendus molestiae beatae unde corrupti tenetur voluptate veniam dolore, ratione quaerat?',
        author: {
          firstName: 'Данил',
          lastName: 'Прытков',
          role: 'Пользователь',
          avatar: 'linkToAvatar',
          verified: true,
        },
      },
      {
        id: 4,
        likesNumber: 30,
        date: 'July 9, 2024 17:24:00',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam culpa et alias ab quisquam ad, fugit adipisci facere minus, repellendus molestiae beatae unde corrupti tenetur voluptate veniam dolore, ratione quaerat?',
        author: {
          firstName: 'Саша',
          lastName: 'Петрова',
          role: 'Жертвователь',
          avatar: 'linkToAvatar',
          verified: false,
        },
      },
      {
        id: 5,
        likesNumber: 50,
        date: 'August 11, 2024 5:24:00',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam culpa et alias ab quisquam ad, fugit adipisci facere minus, repellendus molestiae beatae unde corrupti tenetur voluptate veniam dolore, ratione quaerat?',
        author: {
          firstName: 'Рома',
          lastName: 'Суханов',
          role: 'Куратор',
          avatar: 'linkToAvatar',
          verified: true,
        },
      },
    ],
  },
};

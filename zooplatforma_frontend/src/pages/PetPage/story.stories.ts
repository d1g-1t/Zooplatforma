import { Meta, StoryObj } from '@storybook/react';
import PetPage, { PetPageProps } from './index';

//import './style.module.scss';

export default {
  title: 'pages/PetPage',
  component: PetPage,
} as Meta;

type Story = StoryObj<PetPageProps>;

export const Default: Story = {
  args: {
    name: 'Барсик',
    city: 'Москва',
    breed: 'Британский',
    age: '2 года',
    gender: 'Мужской',
    description: 'Очень ласковый и игривый кот',
    images: ['/images/cat1.jpg', '/images/cat2.jpg', '/images/cat3.jpg'],
    status: 'fundraising',
  },
};

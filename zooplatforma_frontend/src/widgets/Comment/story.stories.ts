import { Meta, StoryObj } from '@storybook/react';
import Comment from './index.tsx';
// import { CommentProps } from './types';

// export default {
//     title: 'Components/Comment',
//     component: Comment,
// } as Meta<CommentProps>;

const meta: Meta<typeof Comment> = {
  title: 'Component/Comment',
  component: Comment,
};

export default meta;

type Story = StoryObj<typeof Comment>;

export const CommentComponent: Story = {
  args: {
    author: {
      firstName: 'Иван',
      lastName: 'Иванов',
      role: 'пользователь',
      avatar: 'string',
      verified: true,
    },
    likesNumber: 2,
    date: '2 часа назад',
    text: 'Спасибо за вашу работу, Екатерина 👍 Спасибо за вашу работу, Екатерина 👍Спасибо за вашу работу, Екатерина 👍Спасибо за вашу работу, Екатерина 👍Спасибо за вашу работу, Екатерина 👍Спасибо за вашу работу, Екатерина 👍',
  },
};

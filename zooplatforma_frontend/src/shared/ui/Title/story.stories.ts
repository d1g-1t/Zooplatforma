// import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TitleProps } from './types';
import Title from './index';

export default {
  title: 'Components/Title',
  component: Title,
  argTypes: {
    level: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6],
      },
    },
  },
} as Meta<TitleProps>;

type Story = StoryObj<TitleProps>;

// История по умолчанию
export const Default: Story = {
  args: {
    level: 1,
    children: 'Заголовок',
  },
};

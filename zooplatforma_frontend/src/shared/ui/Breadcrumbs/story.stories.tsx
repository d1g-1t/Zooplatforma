import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumbs from './index';
import { BreadcrumbsProps } from './types';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    crumbs: {
      control: 'object',
    },
  },
} as Meta<BreadcrumbsProps>;

type Story = StoryObj<BreadcrumbsProps>;

export const Default: Story = {
  args: {
    crumbs: [
      { label: 'Главная', path: '/' },
      { label: 'Собаки', path: '/dogs' },
      { label: 'Малыш Леви', path: '/dogs/levi' },
    ],
  },
};

export const ShortPath: Story = {
  args: {
    crumbs: [
      { label: 'Главная', path: '/' },
      { label: 'Контакты', path: '/contacts' },
    ],
  },
};

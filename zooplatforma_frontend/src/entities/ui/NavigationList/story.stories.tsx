// src/widgets/NavigationList/ui/NavigationList.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationList from './index';
import IconSample from '../../../shared/assets/icons/icon-placeholder.svg?react';

const meta: Meta<typeof NavigationList> = {
  title: 'Widgets/NavigationList',
  component: NavigationList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavigationList>;

export const Expanded: Story = {
  args: {
    minimized: false,
    title: 'Навигация',
    items: [
      {
        text: 'Главная',
        href: '/home',
        Icon: IconSample,
      },
      {
        text: 'Объявления',
        href: '/ads',
        Icon: IconSample,
      },
      {
        text: 'Горячая линия',
        href: '/hotline',
        Icon: IconSample,
      },
      {
        text: 'Зоожурнал',
        href: '/zojournal',
        Icon: IconSample,
      },
    ],
  },
};

export const Minimized: Story = {
  args: {
    minimized: true,
    items: [
      {
        text: 'Курирую',
        href: '/curate',
        Icon: IconSample,
      },
      {
        text: 'Мои объявления',
        href: '/my-ads',
        Icon: IconSample,
      },
      {
        text: 'Мои сообщения',
        href: '/messages',
        Icon: IconSample,
      },
      {
        text: 'Мои питомцы',
        href: '/pets',
        Icon: IconSample,
      },
    ],
  },
};

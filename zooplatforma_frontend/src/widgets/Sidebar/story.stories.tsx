import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './index';
import { Favorite } from './types';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
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

type Story = StoryObj<typeof Sidebar>;

const favorites: Favorite[] = [
  {
    url: '/id000001',
    name: 'Малыш Леви',
  },
  {
    url: '/id000002',
    name: 'Микаса',
  },
];

export const Default: Story = {
  args: {
    favoritesCount: 15,
    favorites: favorites,
  },
};

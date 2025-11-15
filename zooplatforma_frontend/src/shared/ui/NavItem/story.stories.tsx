import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from './index.tsx';

const meta: Meta<typeof NavItem> = {
  title: 'UI/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/register']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const Inactive: Story = {
  args: { text: 'Главная', href: '/main' },
};

export const Active: Story = {
  args: { text: 'Реестр', href: '/register' },
};

import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { AppLinkProps } from './types';
import AppLink from './index';

export default {
  title: 'Components/AppLink',
  component: AppLink,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
    },
    to: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
} as Meta<AppLinkProps>;

type Story = StoryObj<AppLinkProps>;

export const Default: Story = {
  args: {
    to: '/',
    children: 'Home',
    className: '',
  },
};

export const WithClassName: Story = {
  args: {
    to: '/about',
    children: 'About',
    className: 'custom-class',
  },
};

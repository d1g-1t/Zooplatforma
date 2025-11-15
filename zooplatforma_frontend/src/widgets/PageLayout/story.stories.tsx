import type { Meta, StoryObj } from '@storybook/react';
import PageLayout from './index';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta = {
  title: 'Pages/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

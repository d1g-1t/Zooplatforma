import { Meta, StoryObj } from '@storybook/react';
import { PaginationProps } from './types';
import Pagination from './index';

export default {
  title: 'Widgets/Pagination',
  component: Pagination,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['simple', 'full'],
      },
    },
    maxPagesToShow: {
      control: {
        type: 'number',
        min: 4,
        max: 16,
        step: 1,
      },
    },
  },
} as Meta<PaginationProps>;

type Story = StoryObj<PaginationProps>;

export const Full: Story = {
  args: {
    numberOfPages: 10,
    variant: 'full',
  },
};

export const Simple: Story = {
  args: {
    numberOfPages: 10,
    variant: 'simple',
  },
};

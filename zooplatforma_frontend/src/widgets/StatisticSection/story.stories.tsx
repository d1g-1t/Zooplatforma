import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { StatisticSectionProps } from './types';
import { statistics } from './constants';

import StatisticSection from './index';

const meta: Meta<StatisticSectionProps> = {
  title: 'Widgets/StatisticSection',
  component: StatisticSection,
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<StatisticSectionProps>;

export const Default: Story = {
  args: {
    statistics: statistics,
  },
};

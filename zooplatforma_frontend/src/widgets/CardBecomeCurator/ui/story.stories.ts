import { Meta, StoryObj } from '@storybook/react';
import CardBecomeCurator from './index';
import { CardBecomeCuratorProps } from './types';

const meta: Meta<CardBecomeCuratorProps> = {
  title: 'Widgets/CardBecomeCurator',
  component: CardBecomeCurator,
};

export default meta;

type Story = StoryObj<CardBecomeCuratorProps>;

export const Default: Story = {
  args: {
    onClick: () => {
      console.log('clicked');
    },
  },
};

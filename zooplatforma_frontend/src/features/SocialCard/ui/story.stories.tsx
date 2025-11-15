import type { Meta, StoryObj } from '@storybook/react';
import { SocialCard } from '.';
import { SocialCardProps } from './types';
import { socialCardListData } from '../../../widgets/SocialCardList/ui/constants';

const meta: Meta<typeof SocialCard> = {
  title: 'Features/SocialCard',
  component: SocialCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SocialCard>;

const data: SocialCardProps = socialCardListData.cards[0];

export const SocialCardSingle: Story = {
  args: data,
};

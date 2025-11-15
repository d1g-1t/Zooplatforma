import type { Meta, StoryObj } from '@storybook/react';
import { SocialCardList } from '.';
import { SocialCardListFields } from './types';
import { socialCardListData } from './constants';

const meta: Meta<typeof SocialCardList> = {
  title: 'Widgets/SocialCardList',
  component: SocialCardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SocialCardList>;

const data: SocialCardListFields = socialCardListData;

export const SocialCards: Story = {
  args: data,
};

import type { Meta, StoryObj } from '@storybook/react';
import { CardAnimal } from '.';
import { CardAnimalSize, CardAnimalStatus } from './types';

const meta: Meta<typeof CardAnimal> = {
  title: 'UI/CardAnimal',
  component: CardAnimal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CardAnimal>;

export const FundraisingSmall: Story = {
  args: {
    title: 'Армин',
    size: CardAnimalSize.Small,
    cardStatus: CardAnimalStatus.Fundraising,
    progress: 0.25,
    showProgress: true,
    showUrgent: false,
    onClick: () => {
      console.log('Clicked on FundraisingSmall');
    },
  },
};

export const NoStatusUrgentSmall: Story = {
  args: {
    title: 'Леви',
    showUrgent: true,
    onClick: () => {
      console.log('Clicked on NoStatusUrgentSmall');
    },
  },
};

export const LookingForHomeBig: Story = {
  args: {
    title: 'Армин',
    size: CardAnimalSize.Big,
    cardStatus: CardAnimalStatus.LookingForHome,
    progress: 0.75,
    showProgress: true,
    onClick: () => {
      console.log('Clicked on LookingForHomeBig');
    },
  },
};

export const UrgentBig: Story = {
  args: {
    title: 'Микаса',
    image:
      'https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg',
    size: CardAnimalSize.Big,
    cardStatus: CardAnimalStatus.Urgent,
    showUrgent: true,
    onClick: () => {
      console.log('Clicked on UrgentBig');
    },
  },
};

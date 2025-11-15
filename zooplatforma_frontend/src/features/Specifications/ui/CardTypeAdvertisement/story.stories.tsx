import DefaultImage from '../../../../shared/assets/icons/image-placeholder.svg';

import type { Meta, StoryObj } from '@storybook/react';
import { CardTypeAdvertisement } from './index.tsx';
import { OptionsForAdvertisement } from './types.ts';

const meta: Meta<typeof CardTypeAdvertisement> = {
  title: 'features/CardTypeAdvertisement',
  component: CardTypeAdvertisement,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CardTypeAdvertisement>;

export const SingleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {' '}
      {}
      {[
        {
          img: DefaultImage,
          title: OptionsForAdvertisement.LookingForHome,
        },
      ].map((card, index) => (
        <CardTypeAdvertisement
          key={index}
          img={card.img}
          typeOfAdvertisement={card.title}
        />
      ))}
    </div>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {' '}
      {}
      {[
        {
          img: DefaultImage,
          title: OptionsForAdvertisement.LookingForHome,
        },
        {
          img: DefaultImage,
          title: OptionsForAdvertisement.FoundOrMissing,
        },
      ].map((card, index) => (
        <CardTypeAdvertisement
          key={index}
          img={card.img}
          typeOfAdvertisement={card.title}
        />
      ))}
    </div>
  ),
};

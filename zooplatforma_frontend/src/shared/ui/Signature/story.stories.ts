import { Meta, StoryObj } from '@storybook/react';
import Signature from './index';
import { SignatureProps } from './types';

export default {
  title: 'Components/Signature',
  component: Signature,
} as Meta<SignatureProps>;

type Story = StoryObj<SignatureProps>;

export const Default: Story = {
  args: {
    userName: 'Екатерина Дроздова',
    userRole: 'Куратор',
    verified: true,
  },
};

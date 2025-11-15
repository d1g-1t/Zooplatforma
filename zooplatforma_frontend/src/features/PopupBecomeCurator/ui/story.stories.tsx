import type { Meta, StoryObj } from '@storybook/react';
import { PopupBecomeCurator } from '.';

const meta: Meta<typeof PopupBecomeCurator> = {
  title: 'Features/PopupBecomeCurator',
  component: PopupBecomeCurator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PopupBecomeCurator>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
  },
};

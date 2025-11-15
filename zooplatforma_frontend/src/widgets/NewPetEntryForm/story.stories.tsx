import { Meta, StoryObj } from '@storybook/react';
import { NewPetEntryForm } from '.';
import { formData } from './mock-data';

const meta: Meta<typeof NewPetEntryForm> = {
  title: 'Widgets/NewPetEntryForm',
  component: NewPetEntryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NewPetEntryForm>;

export const Default: Story = {
  args: {
    data: formData,
  },
};

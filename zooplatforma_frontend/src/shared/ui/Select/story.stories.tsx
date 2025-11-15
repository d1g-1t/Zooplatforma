import type { Meta, StoryObj } from '@storybook/react';
import Select from './index.tsx';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Billboard: Story = {
  args: {
    label: 'Тип объявления',
    selected: 'Все',
    options: ['Все', 'Сбор средств', 'Ищет дом', 'Потерялся', 'Нашелся'],
    onChange: (value: string) => {
      console.log(value);
    },
  },
};

export const Register: Story = {
  args: {
    label: 'Тип регистрации',
    selected: 'Частное лицо',
    options: ['Частное лицо', 'Организация'],
    onChange: (value: string) => {
      console.log(value);
    },
  },
};

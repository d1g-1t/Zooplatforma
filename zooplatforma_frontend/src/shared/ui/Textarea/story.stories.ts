import { Meta, StoryObj } from '@storybook/react';
import Textarea, { TextareaProps } from './index';

// Метаданные для Storybook
const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: 'Введите сообщение',
    placeholder: 'Введите сообщение',
    value: '',
    onChange: (e) => console.log('changed: ', e),
    error: '',
  },
};

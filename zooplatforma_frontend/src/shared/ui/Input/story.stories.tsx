import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TextInput,
  PasswordInput,
  EmailInput,
  TelInput,
  NumberInput,
} from './index';
import { InputProps } from './types';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input',
  component: TextInput,
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<InputProps>;

export const Text: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: 'Введите текст',
    label: 'Text Input',
  },
};

export const Password: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <PasswordInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: 'Введите пароль',
    label: 'Password Input',
  },
};

export const Email: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <EmailInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: 'Введите почту',
    label: 'Email Input',
  },
};

export const Tel: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <TelInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: 'Введите телефон',
    label: 'Tel Input',
  },
};

export const Number: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <NumberInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: 'Введите сумму',
    label: 'Number Input',
  },
};

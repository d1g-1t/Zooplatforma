import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './index';
import { LoginFormProps } from './types';

const meta: Meta<LoginFormProps> = {
  title: 'Widgets/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<LoginFormProps>;

export const Default: Story = {
  args: {
    emailValue: '',
    passwordValue: '',
    onEmailChange: (e) => console.log('Email changed:', e.target.value),
    onPasswordChange: (e) => console.log('Password changed:', e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    isSubmitting: false,
    forgotPasswordLink: '/forgot-password',
    // enableSocialLogin: true,
  },
};

export const WithErrors: Story = {
  args: {
    emailValue: 'user@example.com',
    passwordValue: '',
    onEmailChange: (e) => console.log('Email changed:', e.target.value),
    onPasswordChange: (e) => console.log('Password changed:', e.target.value),
    onSubmit: (e) => {
      e.preventDefault();
      console.log('Form submitted');
    },
    emailError: 'Неверный email',
    passwordError: 'Пароль обязателен',
    isSubmitting: false,
    forgotPasswordLink: '/forgot-password',
    // enableSocialLogin: true,
  },
};

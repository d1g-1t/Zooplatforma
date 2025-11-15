import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationFormProps } from './types';
import RegistrationForm from './index';

const meta: Meta<RegistrationFormProps> = {
  title: 'Widgets/RegistrationForm',
  component: RegistrationForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<RegistrationFormProps>;

export const Default: Story = {
  args: {
    first_name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  },
};

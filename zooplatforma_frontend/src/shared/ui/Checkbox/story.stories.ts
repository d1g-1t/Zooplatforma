import { Meta, StoryObj } from '@storybook/react';

import CustomCheckbox, { CustomCheckboxProps } from './index';

export default {
  title: 'Components/CustomCheckbox',
  component: CustomCheckbox,
} as Meta<CustomCheckboxProps>;

type Story = StoryObj<CustomCheckboxProps>;

export const Default: Story = {
  args: {
    children:
      'Соглашаюсь на обработку моих персональных данны, с Правилами пользования сайтом и принимаю Пользовательское соглашение',
  },
};

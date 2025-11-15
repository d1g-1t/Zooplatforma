import { Meta, StoryObj } from '@storybook/react';
import { ButtonProps } from './types';
import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [
          'primary',
          'accent-orange',
          'accent-green',
          'attention',
          'outline-blue',
          'outline-red',
        ],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    style: {
      control: 'object',
    },
  },
} as Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    label: 'Default Button',
    onClick: () => alert('Button Clicked'),
    color: 'primary',
    type: 'button',
    disabled: false,
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    onClick: () => alert('Primary Button Clicked'),
    color: 'primary',
    type: 'button',
    disabled: false,
  },
};

export const AccentOrange: Story = {
  args: {
    label: 'Orange Button',
    onClick: () => alert('Secondary Button Clicked'),
    color: 'accent-orange',
    type: 'button',
    disabled: false,
  },
};
export const AccentGreen: Story = {
  args: {
    label: 'Green Button',
    onClick: () => alert('Secondary Button Clicked'),
    color: 'accent-green',
    type: 'button',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    onClick: () => alert('Disabled Button Clicked'),
    color: 'primary',
    type: 'button',
    disabled: true,
  },
};

export const Attention: Story = {
  args: {
    label: 'Attention Button',
    onClick: () => alert('Attention Button Clicked'),
    color: 'attention',
    type: 'button',
    disabled: false,
  },
};

export const OutlineBlue: Story = {
  args: {
    label: 'Outline Blue Button',
    onClick: () => alert('Outline Blue Button Clicked'),
    color: 'outline-blue',
    type: 'button',
    disabled: false,
  },
};

export const OutlineRed: Story = {
  args: {
    label: 'Outline Red Button',
    onClick: () => alert('Outline Red Button Clicked'),
    color: 'outline-red',
    type: 'button',
    disabled: false,
  },
};

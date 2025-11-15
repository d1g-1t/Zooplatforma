import { Meta, StoryObj } from '@storybook/react';
import UploadFile from './index';

import './style.module.scss';
import { UploadFileProps } from './types';

export default {
  title: 'UI/UploadFile',
  component: UploadFile,
} as Meta;

type Story = StoryObj<UploadFileProps>;

export const Default: Story = {
  args: {
    title: 'Фото животного',
  },
};

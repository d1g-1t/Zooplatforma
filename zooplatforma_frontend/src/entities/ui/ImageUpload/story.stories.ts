import { Meta, StoryObj } from '@storybook/react';
import ImageUpload from './index';

// Метаданные для Storybook
const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  argTypes: {
    maxPhotos: { control: { type: 'number', min: 1, max: 10, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

// Дефолтная история для ImageUpload
export const Default: Story = {
  args: {
    maxPhotos: 3, // По умолчанию, максимальное количество фотографий - 3
  },
};

// История с измененным количеством максимальных фотографий
export const CustomMaxPhotos: Story = {
  args: {
    maxPhotos: 5, // Изменено на 5 фотографий
  },
};

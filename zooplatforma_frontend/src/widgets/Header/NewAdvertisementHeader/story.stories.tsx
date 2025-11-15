import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import NewAdvertisementHeader from './index';
import { HeaderProps } from './types';

const meta: Meta<HeaderProps> = {
  title: 'Widgets/Header/NewAdvertisementHeader',
  component: NewAdvertisementHeader,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {
    onSearch: (query: string) => console.log('Searching for:', query),
    onCreateClick: () => console.log('Create button clicked'),
    textTitle: '',
    textButtonSave: 'Сохранить',
    textButtonReset: 'Отмена',
    textButtonSubmit: 'Опубликовать',
    draftText: 'Черновик автоматически сохранен, 15.11.2023, 17:20',
  },
};

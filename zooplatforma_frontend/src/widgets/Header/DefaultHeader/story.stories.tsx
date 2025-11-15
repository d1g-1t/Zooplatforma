import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import DefaultHeader from './index';
import { HeaderProps } from './types';

const meta: Meta<HeaderProps> = {
  title: 'Widgets/Header/DefaultHeader',
  component: DefaultHeader,
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
  },
};

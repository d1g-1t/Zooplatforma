import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import NewPetForm from './index';

const meta: Meta = {
  title: 'Widgets/NewPetForm',
  component: NewPetForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {
    data: {
      name: 'Терродор',
      species: 'немецкая',
      breed: 'овчарка',
      gender: 'кобель',
      birthDate: '26-02-2021',
      color: 'черный',
      chipNumber: 'e13489132',
      tagNumber: '№911',
      tattooNumber: '499999',
      diagnosis: 'здоров',
      ownerFirstName: 'Иван',
      ownerLastName: 'Иванов',
      ownerFatherName: 'Иванович',
      ownerEmail: 'test@test.ru',
      ownerPhone: '+7 999 123 33 33',
      ownerINN: '330-00-55',
      isPurebred: false,
      isReq: true,
    },
  },
};

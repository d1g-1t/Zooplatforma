import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';
import Modal from '../../../shared/ui/Modal';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const headColumns = [
  '№ маркировки чипа',
  'Вид',
  'Порода',
  'Масть',
  'Пол',
  'Дата рождения',
  'Владелец',
];
const data = [
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
  [
    '123456789012345',
    'Собака',
    'Метис',
    'Каштановый',
    'Самец',
    '12.03.2022',
    'Екатерина Дроздова',
  ],
];

export const WithIds: Story = {
  render: (args) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleOpen = () => setModalOpen(true);

    return (
      <>
        <Modal isOpen={modalIsOpen} onClose={handleClose}>
          <div>Настройки таблицы</div>
        </Modal>
        <Table {...args} onOptionsClick={handleOpen}></Table>
      </>
    );
  },
  args: {
    headColumns: headColumns,
    showIdColumn: true,
    data: data,
  },
};

export const WithoutIds: Story = {
  render: (args) => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleOpen = () => setModalOpen(true);

    return (
      <>
        <Modal isOpen={modalIsOpen} onClose={handleClose}>
          <div>Настройки таблицы</div>
        </Modal>
        <Table {...args} onOptionsClick={handleOpen}></Table>
      </>
    );
  },
  args: {
    headColumns: headColumns,
    data: data,
  },
};

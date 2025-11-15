import type { Meta, StoryObj } from '@storybook/react';
import Select from '../../../shared/ui/Select';
import { Filter } from '.';

const meta: Meta<typeof Filter> = {
  title: 'UI/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const filters = (
  <>
    <Select
      label="Тип объявления"
      selected="Все"
      options={['Все', 'Срочно', 'Нашелся', 'Пропал', 'Сбор средств']}
    />
    <Select
      label="Тип животного"
      selected="Все"
      options={['Все', 'Кошки', 'Собаки', 'Парнокопытные']}
    />
    <Select
      label="Пол"
      selected="Все"
      options={['Все', 'Мужской', 'Женский', 'Другой']}
    />
    <Select
      label="Возраст"
      selected="Все"
      options={['Все', 'Сегодня', 'Неделя', 'Месяц', 'Год']}
    />
  </>
);

type Story = StoryObj<typeof Filter>;

export const Multiple: Story = {
  args: {
    children: filters,
    resetCallback: () => {
      console.log('reset filter for multiple');
    },
  },
};

export const Single: Story = {
  args: {
    children: (
      <Select
        label="Тип объявления"
        selected="Все"
        options={['Все', 'Срочно', 'Нашелся', 'Пропал', 'Сбор средств']}
      />
    ),
    resetCallback: () => {
      console.log('reset filter for single');
    },
  },
};

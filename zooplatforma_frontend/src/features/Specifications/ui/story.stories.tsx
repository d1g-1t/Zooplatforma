import type { Meta, StoryObj } from '@storybook/react';
import { Specifications } from '.';
import { SpecificationsEntry } from './types';

const meta: Meta<typeof Specifications> = {
  title: 'Features/Specifications',
  component: Specifications,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Specifications>;

const dataSingle: SpecificationsEntry[] = [
  {
    name: 'Вид',
    value: 'Собака',
  },
];

const dataMultiple: SpecificationsEntry[] = [
  {
    name: 'Вид',
    value: 'Собака',
  },
  {
    name: 'Порода',
    value: 'Метис',
  },
  {
    name: 'Пол',
    value: 'Самец',
  },
  {
    name: 'Кличка',
    value: 'Леви',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
];

const dataMany: SpecificationsEntry[] = [
  {
    name: 'Вид',
    value: 'Собака',
  },
  {
    name: 'Порода',
    value: 'Метис',
  },
  {
    name: 'Пол',
    value: 'Самец',
  },
  {
    name: 'Кличка',
    value: 'Леви',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
  {
    name: 'Масть Масть Масть',
    value: '1',
  },
  {
    name: '1',
    value:
      'Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
  {
    name: 'Масть Масть Масть',
    value: '1',
  },
  {
    name: '1',
    value:
      'Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
  {
    name: 'Масть Масть Масть',
    value: '1',
  },
  {
    name: '1',
    value:
      'Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
  {
    name: 'Масть Масть Масть',
    value: '1',
  },
  {
    name: '1',
    value:
      'Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый',
  },
  {
    name: 'Возраст',
    value: '2-3 года',
  },
  {
    name: 'Масть',
    value: 'Каштановый',
  },
  {
    name: 'Масть Масть Масть',
    value: '1',
  },
  {
    name: '1',
    value:
      'Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый Каштановый',
  },
];

export const SpecificationsSingle: Story = {
  args: {
    specifications: dataSingle,
  },
};

export const SpecificationsMultiple: Story = {
  args: {
    specifications: dataMultiple,
  },
};

export const SpecificationsMany: Story = {
  args: {
    specifications: dataMany,
  },
};

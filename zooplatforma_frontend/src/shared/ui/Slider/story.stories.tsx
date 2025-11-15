import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Slider from './index.tsx';
import { CardAnimal } from '../../../entities/ui/CardAnimal/index.tsx';
import {
  CardAnimalSize,
  CardAnimalStatus,
} from '../../../entities/ui/CardAnimal/types.ts';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

const cardsBig = [
  <CardAnimal
    id={1}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.Urgent}
    showUrgent={true}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
  <CardAnimal
    id={2}
    title="Армин"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.LookingForHome}
    progress={0.75}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={3}
    title="Леви"
    size={CardAnimalSize.Big}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={4}
    title="Армин"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.Fundraising}
    progress={0.25}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={5}
    title="Леви"
    size={CardAnimalSize.Big}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={6}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.Urgent}
    showUrgent={true}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
  <CardAnimal
    id={7}
    title="Армин"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.LookingForHome}
    progress={0.75}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={8}
    title="Леви"
    size={CardAnimalSize.Big}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={9}
    title="Армин"
    size={CardAnimalSize.Big}
    cardStatus={CardAnimalStatus.Fundraising}
    progress={0.25}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
];

const cardsSmall = [
  <CardAnimal
    id={1}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.Urgent}
    showUrgent={true}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
  <CardAnimal
    id={2}
    title="Армин"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.LookingForHome}
    progress={0.75}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={3}
    title="Леви"
    size={CardAnimalSize.Small}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={4}
    title="Армин"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.Fundraising}
    progress={0.25}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={5}
    title="Леви"
    size={CardAnimalSize.Small}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={6}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.Urgent}
    showUrgent={true}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
  <CardAnimal
    id={7}
    title="Армин"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.LookingForHome}
    progress={0.75}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={8}
    title="Леви"
    size={CardAnimalSize.Small}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={9}
    title="Армин"
    size={CardAnimalSize.Small}
    cardStatus={CardAnimalStatus.Fundraising}
    progress={0.25}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
];

export const CardsLarge: Story = {
  args: {
    title: 'Осталось еще немного',
    children: cardsBig,
  },
};

export const CardsSmall: Story = {
  args: {
    title: 'Ищут новый дом',
    children: cardsSmall,
  },
};

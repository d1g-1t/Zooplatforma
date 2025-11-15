import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import Gallery from './index';
import { GalleryProps } from './types';
import { CardAnimal } from '../../entities/ui/CardAnimal';
import { CardAnimalStatus } from '../../entities/ui/CardAnimal/types';

const meta: Meta<GalleryProps> = {
  title: 'Widgets/Gallery',
  component: Gallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<GalleryProps>;

const cards = [
  <CardAnimal
    id={1}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    cardStatus={CardAnimalStatus.Urgent}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
  <CardAnimal
    id={2}
    title="Армин"
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
    cardStatus={CardAnimalStatus.Fundraising}
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={4}
    title="Армин"
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
    onClick={() => {
      console.log('Clicked on Леви');
    }}
  />,
  <CardAnimal
    id={6}
    title="Армин"
    cardStatus={CardAnimalStatus.Fundraising}
    progress={0.25}
    showProgress={true}
    onClick={() => {
      console.log('Clicked on Армин');
    }}
  />,
  <CardAnimal
    id={7}
    title="Микаса"
    image="https://aromacaresolutions.co.uk/wp-content/uploads/2022/11/How-to-stop-rats-from-smelling-620x480.jpg"
    cardStatus={CardAnimalStatus.Urgent}
    onClick={() => {
      console.log('Clicked on Микаса');
    }}
  />,
];

export const Default: Story = {
  args: {
    title: 'Другие объявления куратора',
    children: cards,
  },
};

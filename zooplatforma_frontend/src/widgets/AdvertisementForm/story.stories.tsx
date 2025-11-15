import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AdvertisementForm from './index';
import { AdvertisementFormProps } from './types';
import {
  petCityList,
  petGenderList,
  petPlaceList,
  petStatusList,
} from './mock-data';

const meta: Meta<AdvertisementFormProps> = {
  title: 'Widgets/AdvertisementForm',
  component: AdvertisementForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<AdvertisementFormProps>;

export const Default: Story = {
  args: {
    advertisementTitleValue: '',
    advertisementDescriptionValue: '',
    advertisementPetInfoPetStatus: petStatusList[0],
    advertisementPetInfoPetNickname: '',
    advertisementPetInfoPetType: '',
    advertisementPetInfoPetGender: petGenderList[0],
    advertisementPetInfoPetBreed: '',
    advertisementPetInfoPetColor: '',
    advertisementPetInfoPetCity: petCityList[0],
    advertisementPetInfoPetPlace: petPlaceList[0],
    advertisementCuratorValue: '',
    advertisementNecessaryAmountValue: '',
    advertisementGallery: [],
  },
};

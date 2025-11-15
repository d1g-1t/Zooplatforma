import { UploadFileData } from '../../entities/ui/UploadFile/types.ts';

export interface AdvertisementFormProps {
  advertisementTitleValue: string;
  advertisementDescriptionValue: string | null;
  advertisementPetInfoPetStatus: string;
  advertisementPetInfoPetNickname: string;
  advertisementPetInfoPetType: string;
  advertisementPetInfoPetGender: string;
  advertisementPetInfoPetBreed: string;
  advertisementPetInfoPetColor: string;
  advertisementPetInfoPetCity: string;
  advertisementPetInfoPetPlace: string;
  advertisementCuratorValue: string | null;
  advertisementNecessaryAmountValue: string;
  advertisementGallery: UploadFileData[];
}

export interface advertisementDictionaries {
  petStatusList: string[];
  petGenderList: string[];
  petCityList: string[];
  petPlaceList: string[];
}

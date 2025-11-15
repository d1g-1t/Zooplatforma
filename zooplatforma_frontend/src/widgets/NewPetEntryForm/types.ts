import { VaccinationFormData } from './VaccinationForm/types';
import type { VaccinationType } from './VaccinationInput/types';
import { UploadFileData } from '../../entities/ui/UploadFile/types.ts';

export type PetMarkingData = {
  value: string;
  verified: boolean;
};

export type PetVaccinationData = {
  id: string;
  type: VaccinationType;
  subject: string;
  date: string;
  verified: boolean;
};

// export type NewPetEntryFormData = {
//   ownershipStatusList: string[];
//   ownershipStatus: string;
//   onOwnerAddCallback?: () => void;
//   onPetChipAddCallback?: () => void;
//   onPetTagAddCallback?: () => void;
//   onPetBrandAddCallback?: () => void;
//   onPetVaccinationAddCallback?: () => void;
//   onPetDewormingAddCallback?: () => void;
//   petTypeList: string[];
//   petType: string;
//   petGenderList: string[];
//   petGender: string;
//   petNameValue: string;
//   petBreedValue: string;
//   petColorValue: string;
//   petBirthdateValue: string;
//   petBirthdayIsApproximate: boolean;
//   petChipValue?: PetMarkingData;
//   petTagValue?: PetMarkingData;
//   petBrandValue?: PetMarkingData;
//   petVaccinationValue?: PetVaccinationData[];
//   onPetNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetBreedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetBirthdateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetChipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onPetBrandChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onChipVerificationClick: () => void;
//   onTagVerificationClick: () => void;
//   onBrandVerificationClick: () => void;
//   petNameError: string;
//   petBreedError: string;
//   petColorError: string;
//   petBirthdateError: string;
//   petChipError: string;
//   petTagError: string;
//   petBrandError: string;
//   vaccinationFormOpen?: boolean;
//   vaccinationFormType?: VaccinationType;
//   vaccinationFormData?: VaccinationFormData;
// };

export type NewPetEntryFormData = {
  ownershipStatusList: string[];
  ownershipStatus: string;
  petTypeList: string[];
  petType: string;
  petGenderList: string[];
  petGender: string;
  petNameValue: string;
  petBreedValue: string;
  petColorValue: string;
  petBirthdateValue: string;
  petBirthdayIsApproximate: boolean;
  petChipValue?: PetMarkingData;
  petTagValue?: PetMarkingData;
  petBrandValue?: PetMarkingData;
  vaccinationList: PetVaccinationData[];
  petVaccinationValue?: PetVaccinationData;
  vaccinationFormOpen?: boolean;
  vaccinationFormType?: VaccinationType;
  vaccinationFormData?: VaccinationFormData;
  attachedPhoto: UploadFileData;
};

export type NewPetEntryFormProps = {
  className?: string;
  data: NewPetEntryData;
  onSubmit?: () => void;
  onAbort?: () => void;
};

export type NewPetEntryData = {
  ownershipStatusList: string[];
  petTypeList: string[];
  petGenderList: string[];
  vaccinationFormData: VaccinationFormData;
};

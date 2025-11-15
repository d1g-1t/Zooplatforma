import {
  type VaccinationFormData,
  ReminderFrequency,
} from './VaccinationForm/types';
import { NewPetEntryData } from './types';

export const ownershipStatus = ['Я - владелец', 'Я - куратор'];

export const petType = ['Собака', 'Кошка', 'Бурундук'];

export const gender = ['Самец', 'Самка'];

// const vaccinations: PetVaccinationData[] = [
//   {
//     type: VaccinationType.Deworming,
//     subject: 'Глисты',
//     date: '01.01.0001',
//     verified: false,
//   },
//   {
//     type: VaccinationType.Vaccination,
//     subject: 'Бешенство',
//     date: '01.01.0001',
//     verified: true,
//   },
// ];

export const vacSubjects = ['Блохи', 'Глисты'];

export const vaccines = ['Гетт Express', 'Сетт Slow'];

export const frequencies: Array<string> = Object.values(
  ReminderFrequency
) as string[];

const vaccinationFormData: VaccinationFormData = {
  subject: vacSubjects[0],
  subjectOptions: vacSubjects,
  date: '01.01.0001',
  vaccineOptions: vaccines,
  vaccine: vaccines[0],
  createReminderIsSet: true,
  onCreateReminderChange: () => {},
  reminderFrequency: ReminderFrequency.Once,
  reminderFrequencyOptions: frequencies,
  reminderDate: '01.02.0001',
};

//
// export const formData: NewPetEntryFormData = {
//   ownershipStatusList: ownershipStatus,
//   ownershipStatus: ownershipStatus[0],
//   petTypeList: petType,
//   petType: petType[0],
//   petGenderList: gender,
//   petGender: gender[0],
//   petNameValue: '',
//   petBreedValue: '',
//   petColorValue: '',
//   petBirthdateValue: '',
//   petBirthdayIsApproximate: false,
//   petChipValue: { value: '', verified: false },
//   vaccinationList: vaccinations,
//   petVaccinationValue: vaccinations[0],
//   vaccinationFormOpen: true,
//   vaccinationFormType: VaccinationType.Vaccination,
//   vaccinationFormData: vaccinationFormData,
// };

export const formData: NewPetEntryData = {
  ownershipStatusList: ownershipStatus,
  petTypeList: petType,
  petGenderList: gender,
  vaccinationFormData: vaccinationFormData,
};

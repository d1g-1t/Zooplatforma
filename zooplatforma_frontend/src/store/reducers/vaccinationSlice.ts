import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import {
  VaccinationDataType,
  VaccinationType,
} from '../../widgets/NewPetEntryForm/VaccinationInput/types.ts';

export const initialState = {
  petVaccinationValue: [
    {
      id: 'stirng',
      subject: 'string',
      date: 'string',
      verified: true,
    },
  ] as VaccinationDataType[],
  subject: '',
  date: '',
  vaccine: '',
  createReminderIsSet: false,
  reminderFrequency: null,
  reminderDate: '',
};

const VaccinationSlice = createSlice({
  name: 'vaccination',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      {
        state.subject = payload.subject;
        state.date = payload.date;
        state.vaccine = payload.vaccine;
        state.createReminderIsSet = payload.createReminderIsSet;
        state.reminderFrequency = payload.reminderFrequency;
        state.reminderDate = payload.reminderDate;
      }
    },
    addVaccination(state) {
      const newVaccination: VaccinationDataType = {
        type: VaccinationType.Vaccination, // нужно сделать динамическим
        subject: state.subject,
        date: state.date,
        verified: false, // нужно получить это значение из формы
        id: nanoid(),
      };

      state.petVaccinationValue.push(newVaccination);
    },
    deleteVaccination(state, { payload }) {
      state.petVaccinationValue = state.petVaccinationValue.filter(
        (vaccination) => vaccination.id !== payload
      );
    },
  },
});

export const { updateFormField, deleteVaccination } = VaccinationSlice.actions;
export const { addVaccination } = VaccinationSlice.actions;

export default VaccinationSlice;

export const selectSubject = (state: RootState) => state.vaccination.subject;
export const selectDate = (state: RootState) => state.vaccination.date;
export const selectVaccine = (state: RootState) => state.vaccination.vaccine;
export const selectCreateReminderIsSet = (state: RootState) =>
  state.vaccination.createReminderIsSet;
export const selectReminderFrequency = (state: RootState) =>
  state.vaccination.reminderFrequency;
export const selectReminderDate = (state: RootState) =>
  state.vaccination.reminderDate;

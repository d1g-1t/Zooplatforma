import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export const initialState = {
  ownershipStatus: '',
  petType: '',
  petGender: '',
  petNameValue: '',
  petBreedValue: '',
  petColorValue: '',
  petBirthdateValue: '',
  petBirthdayIsApproximate: false,
  attachedPhoto: null,
};

const NewPetEntryFormSlice = createSlice({
  name: 'new-entry-pet-form',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      state.ownershipStatus = payload.ownershipStatus;
      state.petType = payload.petType;
      state.petGender = payload.petGender;
      state.petNameValue = payload.petNameValue;
      state.petBreedValue = payload.petBreedValue;
      state.petColorValue = payload.petColorValue;
      state.petBirthdateValue = payload.petBirthdateValue;
      state.petBirthdayIsApproximate = payload.petBirthdayIsApproximate;
      state.attachedPhoto = payload.attachedPhoto;
    },
  },
});

export const { updateFormField } = NewPetEntryFormSlice.actions;

export default NewPetEntryFormSlice;

export const selectOwnershipStatus = (state: RootState) =>
  state.newPetEntryForm.ownershipStatus;
export const selectPetType = (state: RootState) =>
  state.newPetEntryForm.petType;
export const selectPetGender = (state: RootState) =>
  state.newPetEntryForm.petGender;
export const selectPetNameValue = (state: RootState) =>
  state.newPetEntryForm.petNameValue;
export const selectPetBreedValue = (state: RootState) =>
  state.newPetEntryForm.petBreedValue;
export const selectPetColorValue = (state: RootState) =>
  state.newPetEntryForm.petColorValue;
export const selectPetBirthdateValue = (state: RootState) =>
  state.newPetEntryForm.petBirthdateValue;
export const selectPetBirthdayIsApproximate = (state: RootState) =>
  state.newPetEntryForm.petBirthdayIsApproximate;
export const selectAttachedPhoto = (state: RootState) =>
  state.newPetEntryForm.attachedPhoto;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

export const initialState = {
  name: '',
  species: '',
  breed: '',
  gender: '',
  birthDate: '',
  color: '',
  chipNumber: '',
  tagNumber: '',
  tattooNumber: '',
  diagnosis: '',
  ownerFirstName: '',
  ownerLastName: '',
  ownerFatherName: '',
  ownerEmail: '',
  ownerINN: '',
  ownerPhone: '',
  isPurebred: false,
  attachedPhoto: null,
};

const NewPetFormSlice = createSlice({
  name: 'new-pet-form',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      // console.log(payload)
      state.name = payload.name;
      state.species = payload.species;
      state.breed = payload.breed;
      state.gender = payload.gender;
      state.birthDate = payload.birthDate;
      state.color = payload.color;
      state.isPurebred = payload.isPurebred;
      state.attachedPhoto = payload.attachedPhoto;

      state.chipNumber = payload.chipNumber;
      state.tagNumber = payload.tagNumber;
      state.tattooNumber = payload.tattooNumber;
      state.diagnosis = payload.diagnosis;
      state.ownerFirstName = payload.ownerFirstName;
      state.ownerLastName = payload.ownerLastName;
      state.ownerFatherName = payload.ownerFatherName;
      state.ownerEmail = payload.ownerEmail;
      state.ownerINN = payload.ownerINN;
      state.ownerPhone = payload.ownerPhone;

    },
    updateMainInfo(state, { payload }) {
      // console.log(payload)
      state.name = payload.name;
      state.species = payload.species;
      state.breed = payload.breed;
      state.gender = payload.gender;
      state.birthDate = payload.birthDate;
      state.color = payload.color;
      state.attachedPhoto = payload.attachedPhoto;
    },
  },
});

export const { updateMainInfo, updateFormField } = NewPetFormSlice.actions;

export default NewPetFormSlice;

export const selectName = (state: RootState) => state.newPetForm.name;
export const selectSpecies = (state: RootState) => state.newPetForm.species;
export const selectBreed = (state: RootState) => state.newPetForm.breed;
export const selectGender = (state: RootState) => state.newPetForm.gender;
export const selectBirthDate = (state: RootState) => state.newPetForm.birthDate;
export const selectColor = (state: RootState) => state.newPetForm.color;
export const selectAttachedPhoto = (state: RootState) =>
  state.newPetForm.attachedPhoto;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
export const initialState = {
  petChipValue: {
    value: '',
    verified: false,
  },
  petTagValue: {
    value: '',
    verified: false,
  },
  petBrandValue: {
    value: '',
    verified: false,
  },
};

const PetMarking = createSlice({
  name: 'pet-marking',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      state.petChipValue = payload.petChipValue;
      state.petTagValue = payload.petTagValue;
      state.petBrandValue = payload.petBrandValue;
    },
  },
});

export const { updateFormField } = PetMarking.actions;
export default PetMarking;

export const selectPetChipValue = (state: RootState) =>
  state.petMarking.petChipValue;
export const selectPetTagValue = (state: RootState) =>
  state.petMarking.petTagValue;
export const selectPetBrandValue = (state: RootState) =>
  state.petMarking.petBrandValue;

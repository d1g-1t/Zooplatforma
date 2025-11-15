import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';

const initialState = {
  advertisementTitleValue: '',
  advertisementDescriptionValue: '',
  advertisementPetInfoPetStatus: '',
  advertisementPetInfoPetNickname: '',
  advertisementPetInfoPetType: '',
  advertisementPetInfoPetGender: '',
  advertisementPetInfoPetBreed: '',
  advertisementPetInfoPetColor: '',
  advertisementPetInfoPetCity: '',
  advertisementPetInfoPetPlace: '',
  advertisementCuratorValue: '',
  advertisementNecessaryAmountValue: '',
};

const AdvertisementSlice = createSlice({
  name: 'advertisement',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      state.advertisementTitleValue = payload.advertisementTitleValue;
      state.advertisementDescriptionValue =
        payload.advertisementDescriptionValue;
      state.advertisementPetInfoPetStatus =
        payload.advertisementPetInfoPetStatus;
      state.advertisementPetInfoPetNickname =
        payload.advertisementPetInfoPetNickname;
      state.advertisementPetInfoPetType = payload.advertisementPetInfoPetType;
      state.advertisementPetInfoPetGender =
        payload.advertisementPetInfoPetGender;
      state.advertisementPetInfoPetBreed = payload.advertisementPetInfoPetBreed;
      state.advertisementPetInfoPetColor = payload.advertisementPetInfoPetColor;
      state.advertisementPetInfoPetCity = payload.advertisementPetInfoPetCity;
      state.advertisementPetInfoPetPlace = payload.advertisementPetInfoPetPlace;
      state.advertisementCuratorValue = payload.advertisementCuratorValue;
      state.advertisementNecessaryAmountValue =
        payload.advertisementNecessaryAmountValue;
    },
  },
});

export const { updateFormField } = AdvertisementSlice.actions;

export default AdvertisementSlice;

export const selectTitleValue = (state: RootState) =>
  state.advertisement.advertisementTitleValue;
export const selectDescriptionValue = (state: RootState) =>
  state.advertisement.advertisementDescriptionValue;
export const selectPetInfoPetStatus = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetStatus;
export const selectPetInfoPetNickname = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetNickname;
export const selectPetInfoPetType = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetType;
export const selectPetInfoPetGender = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetGender;
export const selectPetInfoPetBreed = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetBreed;
export const selectPetPetInfoPetColor = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetColor;
export const selectPetPetInfoPetCity = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetCity;
export const selectPetInfoPetPlace = (state: RootState) =>
  state.advertisement.advertisementPetInfoPetPlace;
export const selectCuratorValue = (state: RootState) =>
  state.advertisement.advertisementCuratorValue;
export const selectNecessaryAmountValue = (state: RootState) =>
  state.advertisement.advertisementNecessaryAmountValue;

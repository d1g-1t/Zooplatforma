import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';
import { ProfileFormMock } from '../../pages/editProfile/mock-data.ts';

/* export const initialState: EditProfileFormProps = {
  firstName: '',
  lastName: '',
  address: null,
  email: '',
  phone: '',
  title: null,
  description: null,
  hideEmail: true,
  hidePhone: true,
  attachedPhoto: null,
}; */

const initialState = ProfileFormMock;

const editProfileFormSlice = createSlice({
  name: 'editProfileFormSlice',
  initialState,
  reducers: {
    updateFormField(state, { payload }) {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.address = payload.address;
      state.email = payload.email;
      state.phone = payload.phone;
      state.title = payload.title;
      state.description = payload.description;
      state.hideEmail = payload.hideEmail;
      state.hidePhone = payload.hidePhone;
      if (payload.attachedPhoto) {
        state.attachedPhoto = {
          name: payload.attachedPhoto.name,

          url: payload.attachedPhoto.url,

          size: payload.attachedPhoto.size,


        };
      } /* else {
        state.attachedPhoto = null;
      } */
    },
  },
});

export const { updateFormField } = editProfileFormSlice.actions;

export default editProfileFormSlice;

export const selectFirstName = (state: RootState) =>
  state.editProfileFormSlice.firstName;
export const selectLastName = (state: RootState) =>
  state.editProfileFormSlice.lastName;
export const selectAddress = (state: RootState) =>
  state.editProfileFormSlice.address;
export const selectEmail = (state: RootState) =>
  state.editProfileFormSlice.email;
export const selectPhone = (state: RootState) =>
  state.editProfileFormSlice.phone;
export const selectTitle = (state: RootState) =>
  state.editProfileFormSlice.title;
export const selectDescription = (state: RootState) =>
  state.editProfileFormSlice.description;
export const selectHideEmail = (state: RootState) =>
  state.editProfileFormSlice.hideEmail;
export const selectHidePhone = (state: RootState) =>
  state.editProfileFormSlice.hidePhone;
export const selectAttachedPhoto = (state: RootState) =>
  state.editProfileFormSlice.attachedPhoto;

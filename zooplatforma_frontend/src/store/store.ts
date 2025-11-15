import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { petsReducer } from '../slices/petSlice';
import { userSlice } from './reducers/userSlice.ts';
import newPetFormSlice from './reducers/newPetFormSlice.ts';
import newPetEntryFormSlice from './reducers/newPetEntryFormSlice.ts';
import vaccinationSlice from './reducers/vaccinationSlice.ts';
import advertisementSlice from './reducers/advertisementSlice.ts';
import petMarking from './reducers/markingSlice.ts';
import editProfileFormSlice from './reducers/editProfileFormSlice.ts';



import animalSlice from './reducers/animalSlice.ts';

export const store = configureStore({
  reducer: {
    newPetForm: newPetFormSlice.reducer,
    newPetEntryForm: newPetEntryFormSlice.reducer,
    vaccination: vaccinationSlice.reducer,
    advertisement: advertisementSlice.reducer,
    petMarking: petMarking.reducer,
    editProfileFormSlice: editProfileFormSlice.reducer,
    animalSlice: animalSlice.reducer,
    pets: petsReducer,
    user: userSlice.reducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type GetState = () => RootState;

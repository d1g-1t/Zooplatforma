import { createSlice, nanoid } from '@reduxjs/toolkit';
import { UploadFileData } from '../../entities/ui/UploadFile/types';
import {
  VaccinationDataType,
  VaccinationType,
} from '../../widgets/NewPetEntryForm/VaccinationInput/types.ts';
//import api from '../../shared/lib/api.ts';
/* 
export type TServerResponse<T> = {
  success: boolean;
  message: string;
} & T;

export const getAnimalByNumberApi = async (
  data: number
): Promise<TServerResponse<AnimalState>> => {
  return await api.get<TServerResponse<AnimalState>>(`api/v1/pets/${data}`);
};

export const fetchAnimalNumber: AsyncThunk<
  TServerResponse<AnimalState>,
  number,
  object
> = createAsyncThunk('animalNumber', async (data: number) => {
  return await getAnimalByNumberApi(data);
});
 */
// характеристика питомца, загружаемого с сервера
// на бэкэнде поля другие, надо переделывать
export interface AnimalState {
  id: string;
  petType: string;
  petGender: string;
  petNameValue: string;
  petBreedValue: string;
  petColorValue: string;
  petBirthdateValue: string;
  petBirthdayIsApproximate: boolean;
  attachedPhoto: UploadFileData | null;
  petChipValue: {
    value: string;
    verified: boolean;
  };
  petTagValue: {
    value: string;
    verified: boolean;
  };
  petBrandValue: {
    value: string;
    verified: boolean;
  };
  petVaccinationValue: VaccinationDataType[];
  ownershipStatus: string;
}

export const initialState = {
  animal: {
    id: '',
    petType: '',
    petGender: '',
    petNameValue: '',
    petBreedValue: '',
    petColorValue: '',
    petBirthdateValue: '',
    petBirthdayIsApproximate: false,
    attachedPhoto: null,
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
    petVaccinationValue: [],
    ownershipStatus: '',
  } as AnimalState,
  subject: '',
  date: '',
  vaccine: '',
  createReminderIsSet: false,
  reminderFrequency: null,
  reminderDate: '',
  isLoading: false,
  animals: [], // AnimalState[]
};
//const initialState = ProfileAnimalMock;

const animalSlice = createSlice({
  name: 'animalSlice',
  initialState,

  reducers: {
    updateAnimalProfile(state, { payload }) {
      state.animal.petType = payload.petType;
      state.animal.petGender = payload.petGender;
      state.animal.petNameValue = payload.petNameValue;
      state.animal.petBreedValue = payload.petBreedValue;
      state.animal.petColorValue = payload.petColorValue;
      state.animal.petBirthdateValue = payload.petBirthdateValue;
      state.animal.petBirthdayIsApproximate = payload.petBirthdayIsApproximate;
      state.animal.attachedPhoto = payload.attachedPhoto;
      state.animal.petChipValue = payload.petChipValue;
      state.animal.petTagValue = payload.petTagValue;
      state.animal.petBrandValue = payload.petBrandValue;
    },
    updateVaccinationForm(state, { payload }) {
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

      state.animal.petVaccinationValue.push(newVaccination);
    },
    deleteVaccination(state, { payload }) {
      console.log(payload);
      state.animal.petVaccinationValue =
        state.animal.petVaccinationValue.filter(
          (vaccination) => vaccination.id !== payload
        );
      console.log(state.animal.petVaccinationValue);
    },
  },
  /*  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimalNumber.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAnimalNumber.fulfilled, (state, action) => {
        state.animal.id = action.payload.id;
        state.animal.petType = action.payload.petType;
        state.animal.petGender = action.payload.petGender;
        state.animal.petNameValue = action.payload.petNameValue;
        state.animal.petBreedValue = action.payload.petBreedValue;
        state.animal.petColorValue = action.payload.petColorValue;
        state.animal.petBirthdateValue = action.payload.petBirthdateValue;
        state.animal.petBirthdayIsApproximate =
          action.payload.petBirthdayIsApproximate;
        state.animal.petChipValue = action.payload.petChipValue;
        state.animal.petTagValue = action.payload.petTagValue;
        state.animal.petBrandValue = action.payload.petBrandValue;
        state.animal.petVaccinationValue = action.payload.petVaccinationValue;
        if (action.payload.attachedPhoto) {
          state.animal.attachedPhoto = action.payload.attachedPhoto;
        }
      });
  }, */
});

export const {
  updateAnimalProfile,
  updateVaccinationForm,
  addVaccination,
  deleteVaccination,
} = animalSlice.actions;

export default animalSlice;

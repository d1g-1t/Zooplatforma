import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store/store';

interface Pet {
  id: number;
  name: string;
  type: number;
  gender: 'MALE' | 'FEMALE';
  breed: string;
  color: string;
  date_birth: string;
  date_birth_approx: boolean;
  photos: PetPhoto[];
}

interface PetPhoto {
  id: number;
  pet: number;
  photo: string;
  main_photo: boolean;
}

interface PetsState {
  pets: Pet[];
  photos: PetPhoto[];
  loading: boolean;
  error: string | null;
}

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Doggy',
    type: 1,
    gender: 'MALE',
    breed: 'Labrador',
    color: 'Yellow',
    date_birth: '2020-06-01',
    date_birth_approx: false,
    photos: [
      { id: 1, pet: 1, photo: 'photo1.jpg', main_photo: true },
      { id: 2, pet: 1, photo: 'photo2.jpg', main_photo: false },
    ],
  },
  {
    id: 2,
    name: 'Kitty',
    type: 2,
    gender: 'FEMALE',
    breed: 'Persian',
    color: 'White',
    date_birth: '2021-02-15',
    date_birth_approx: true,
    photos: [
      { id: 3, pet: 2, photo: 'photo3.jpg', main_photo: true },
      { id: 4, pet: 2, photo: 'photo4.jpg', main_photo: false },
    ],
  },
];

const mockPetPhotos: PetPhoto[] = [
  { id: 1, pet: 1, photo: 'photo1.jpg', main_photo: true },
  { id: 2, pet: 1, photo: 'photo2.jpg', main_photo: false },
  { id: 3, pet: 2, photo: 'photo3.jpg', main_photo: true },
  { id: 4, pet: 2, photo: 'photo4.jpg', main_photo: false },
];

const initialState: PetsState = {
  pets: mockPets,
  photos: [],
  loading: false,
  error: null,
};

// Async Thunks мок для работы с API

export const fetchPets = createAsyncThunk<
  Pet[],
  void,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/fetchPets', async () => {
  return mockPets;
});

export const createNewPet = createAsyncThunk<
  Pet,
  Pet,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/createPet', async (petData: Pet) => {
  return new Promise<Pet>((resolve) =>
    setTimeout(() => resolve({ ...petData, id: Date.now() }), 1000)
  );
});

export const fetchPetById = createAsyncThunk<
  Pet,
  number,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/fetchPetById', async (petId: number) => {
  return new Promise<Pet>((resolve) =>
    setTimeout(() => resolve(mockPets.find((pet) => pet.id === petId)!), 1000)
  );
});

export const updatePet = createAsyncThunk<
  Pet,
  { id: number; petData: Pet },
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/updatePetById', async ({ id, petData }) => {
  return new Promise<Pet>((resolve) =>
    setTimeout(() => resolve({ ...petData, id }), 1000)
  );
});

export const patchPet = createAsyncThunk<
  Pet,
  { id: number; petData: Partial<Pet> },
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/patchPetById', async ({ id, petData }) => {
  return new Promise<Pet>((resolve) =>
    setTimeout(
      () => resolve({ ...mockPets.find((pet) => pet.id === id)!, ...petData }),
      1000
    )
  );
});

export const deletePet = createAsyncThunk<
  void,
  number,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/deletePetById', async (petId: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      const index = mockPets.findIndex((pet) => pet.id === petId);
      if (index !== -1) mockPets.splice(index, 1);
      resolve();
    }, 1000)
  );
});

export const fetchPetPhotos = createAsyncThunk<
  PetPhoto[],
  number,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/fetchPetPhotos', async (petId: number) => {
  return new Promise<PetPhoto[]>((resolve) =>
    setTimeout(
      () => resolve(mockPetPhotos.filter((photo) => photo.pet === petId)),
      1000
    )
  );
});

export const createNewPetPhoto = createAsyncThunk<
  PetPhoto,
  PetPhoto,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/createPetPhoto', async (photoData: PetPhoto) => {
  return new Promise<PetPhoto>((resolve) =>
    setTimeout(() => resolve({ ...photoData, id: Date.now() }), 1000)
  );
});

export const fetchPetPhotoById = createAsyncThunk<
  PetPhoto,
  number,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/fetchPetPhotoById', async (photoId: number) => {
  return new Promise<PetPhoto>((resolve) =>
    setTimeout(
      () => resolve(mockPetPhotos.find((photo) => photo.id === photoId)!),
      1000
    )
  );
});

export const updatePetPhoto = createAsyncThunk<
  PetPhoto,
  { id: number; photoData: PetPhoto },
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/updatePetPhotoById', async ({ id, photoData }) => {
  return new Promise<PetPhoto>((resolve) =>
    setTimeout(() => resolve({ ...photoData, id }), 1000)
  );
});

export const patchPetPhoto = createAsyncThunk<
  PetPhoto,
  { id: number; photoData: Partial<PetPhoto> },
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/patchPetPhotoById', async ({ id, photoData }) => {
  return new Promise<PetPhoto>((resolve) =>
    setTimeout(
      () =>
        resolve({
          ...mockPetPhotos.find((photo) => photo.id === id)!,
          ...photoData,
        }),
      1000
    )
  );
});

export const deletePetPhoto = createAsyncThunk<
  void,
  number,
  { state: RootState; dispatch: AppDispatch; extra: unknown }
>('pets/deletePetPhotoById', async (photoId: number) => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      const index = mockPetPhotos.findIndex((photo) => photo.id === photoId);
      if (index !== -1) mockPetPhotos.splice(index, 1);
      resolve();
    }, 1000)
  );
});

// Slice
const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action: PayloadAction<Pet[]>) => {
        state.pets = action.payload;
        state.loading = false;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch pets';
      })
      .addCase(createNewPet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.pets.push(action.payload);
        state.loading = false;
      })
      .addCase(createNewPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to create pet';
      })
      .addCase(fetchPetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPetById.fulfilled, (state, action: PayloadAction<Pet>) => {
        const existingPetIndex = state.pets.findIndex(
          (pet) => pet.id === action.payload.id
        );
        if (existingPetIndex === -1) {
          state.pets.push(action.payload);
        } else {
          state.pets[existingPetIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchPetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch pet';
      })
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
        const existingPetIndex = state.pets.findIndex(
          (pet) => pet.id === action.payload.id
        );
        if (existingPetIndex !== -1) {
          state.pets[existingPetIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to update pet';
      })
      .addCase(patchPet.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        const existingPetIndex = state.pets.findIndex(
          (pet) => pet.id === action.payload.id
        );
        if (existingPetIndex !== -1) {
          state.pets[existingPetIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(patchPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to patch pet';
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete pet';
      })
      .addCase(fetchPetPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPetPhotos.fulfilled,
        (state, action: PayloadAction<PetPhoto[]>) => {
          state.photos = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPetPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch pet photos';
      })
      .addCase(createNewPetPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createNewPetPhoto.fulfilled,
        (state, action: PayloadAction<PetPhoto>) => {
          state.photos.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createNewPetPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to create pet photo';
      })
      .addCase(fetchPetPhotoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPetPhotoById.fulfilled,
        (state, action: PayloadAction<PetPhoto>) => {
          const existingPhotoIndex = state.photos.findIndex(
            (photo) => photo.id === action.payload.id
          );
          if (existingPhotoIndex === -1) {
            state.photos.push(action.payload);
          } else {
            state.photos[existingPhotoIndex] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(fetchPetPhotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch pet photo';
      })
      .addCase(updatePetPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updatePetPhoto.fulfilled,
        (state, action: PayloadAction<PetPhoto>) => {
          const existingPhotoIndex = state.photos.findIndex(
            (photo) => photo.id === action.payload.id
          );
          if (existingPhotoIndex !== -1) {
            state.photos[existingPhotoIndex] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updatePetPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to update pet photo';
      })
      .addCase(patchPetPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        patchPetPhoto.fulfilled,
        (state, action: PayloadAction<PetPhoto>) => {
          const existingPhotoIndex = state.photos.findIndex(
            (photo) => photo.id === action.payload.id
          );
          if (existingPhotoIndex !== -1) {
            state.photos[existingPhotoIndex] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(patchPetPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to patch pet photo';
      })
      .addCase(deletePetPhoto.pending, (state) => {
        state.loading = true;
      })

      .addCase(deletePetPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to delete pet photo';
      });
  },
});

export const petsReducer = petsSlice.reducer;
export type { PetsState };

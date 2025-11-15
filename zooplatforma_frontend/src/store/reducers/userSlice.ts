import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { TServerResponse } from '../../shared/lib/types';
import {
  loginUserApi,
  TUserLoginData,
  TAuthResponse,
} from '../../shared/lib/loginUserApi';
import { setCookie } from '../../shared/utils/cookie';
import { RootState } from '../store.ts';

export const loginUser: AsyncThunk<
  TServerResponse<TAuthResponse>,
  TUserLoginData,
  object
> = createAsyncThunk('user/login', async (data: TUserLoginData) => {
  return await loginUserApi(data);
});

type TUser = {
  phone: string;
  firstName: string;
  id: number;
  email: string;
};

type TUserSliceState = {
  user: TUser | null;
  auth: {
    isLoading: boolean;
    error: string | null;
  };
};

const initialState: TUserSliceState = {
  user: null,
  auth: {
    isLoading: false,
    error: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.auth.isLoading = true;
      state.auth.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { tokens } = action.payload;
      state.auth.isLoading = false;
      state.auth.error = null;
      setCookie('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.auth.isLoading = false;
      state.auth.error = action.error.message ?? 'Что-то пошло не так';
    });
  },
});

export const user = (state: RootState) => state.user.user;
export const userAuth = (state: RootState) => state.user.auth;

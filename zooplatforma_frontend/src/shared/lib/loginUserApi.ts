import api from './api';
import { TServerResponse } from './types';

export type TUserLoginData = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  tokens: {
    access: string;
    refresh: string;
  };
};

export const loginUserApi = async (
  data: TUserLoginData
): Promise<TServerResponse<TAuthResponse>> => {
  return await api.post<TServerResponse<TAuthResponse>>('/auth', data);
};

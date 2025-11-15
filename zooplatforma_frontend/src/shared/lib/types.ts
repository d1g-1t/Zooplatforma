export type TServerResponse<T> = {
  success: boolean;
  message: string;
} & T;

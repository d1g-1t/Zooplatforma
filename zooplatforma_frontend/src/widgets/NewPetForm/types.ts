import { UploadFileData } from '../../entities/ui/UploadFile/types.ts';

export interface FormState {
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthDate: string;
  color: string;
  chipNumber: string;
  tagNumber: string;
  tattooNumber: string;
  diagnosis: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerFatherName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerINN: string;
  isPurebred: boolean;

  attachedPhoto: UploadFileData | null;

}

export interface FormAction {
  name: keyof FormState;
  value: string | boolean;
}

export type FormErrors = Partial<FormState>;

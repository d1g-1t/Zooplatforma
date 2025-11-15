import { UploadFileData } from '../../entities/ui/UploadFile/types';

export interface EditProfileFormProps {
  firstName: string;
  lastName: string;
  address: string | null;
  email: string;
  phone: string;
  title: string | null;
  description: string | null;
  hideEmail: boolean;
  hidePhone: boolean;
  attachedPhoto: UploadFileData | null;
}

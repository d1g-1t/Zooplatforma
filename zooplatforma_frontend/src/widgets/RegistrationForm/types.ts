
import { SubmitHandler } from 'react-hook-form';

export interface RegistrationFormProps {
  first_name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
  entranceLink: string;
  className?: string;
  acceptTerms: boolean;

  onSubmit: SubmitHandler<RegistrationFormProps>;

}

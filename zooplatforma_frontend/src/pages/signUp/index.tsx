import s from './style.module.scss';

import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { RegistrationFormProps } from '../../widgets/RegistrationForm/types';
import api from '../../shared/lib/api';

import RegistrationForm from '../../widgets/RegistrationForm';


const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegistrationFormProps> = async (data) => {

    data.phone = data.phone.replace(/[()-]/g, '').replace(/ /g, '');
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const post: Promise<any> = api.post('/auth/users/', data);
    console.log(post);
    post
      .then((result) => {
        console.log(result);
        navigate('/authorization');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${s.container}`}>
      <RegistrationForm
        onSubmit={onSubmit}
        first_name=""
        lastName=""
        email=""
        phone=""
        password=""
        password2=""
        entranceLink=""
        acceptTerms={false}
      />
    </div>
  );
};

export default SignUp;

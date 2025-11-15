import s from './style.module.scss';
import LoginForm from '../../widgets/LoginForm';

const Authorization = () => {
  return (
    <div className={`${s.container}`}>
      <LoginForm
        emailValue=""
        passwordValue=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onSubmit={() => {}}
        emailError=""
        passwordError=""
        registrationLink="/signup"
      />
    </div>
  );
};

export default Authorization;

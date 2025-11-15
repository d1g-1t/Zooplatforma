import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import { LoginFormProps } from './types';
import Button from '../../shared/ui/Button';
import Input from '../../shared/ui/Input';
import Title from '../../shared/ui/Title';
import EyeIcon from '../../shared/assets/icons/icon_eye2.svg';
import EyeOffIcon from '../../shared/assets/icons/icon_eye-closed.svg';
import { useForm } from 'react-hook-form';

import { loginUser } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/store';

const LoginForm: React.FC<LoginFormProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginFormProps) => {
    dispatch(
      loginUser({
        email: data.emailValue,
        password: data.passwordValue,
      })
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className={`${styles.loginForm}`}
    >
      <Title level={2} className={styles.title}>
        Вход
      </Title>
      <p className={styles.registrationPrompt}>
        Нет аккаунта?{' '}
        <Link to={'/signup'} className={styles.registrationLink}>
          {' '}
          Зарегистрироваться
        </Link>
      </p>
      <Input
        className={styles.inputField}
        type="text"
        placeholder="Email или Телефон"
        label="Email или Телефон"
        error={errors.emailValue?.message}
        {...register('emailValue', {
          required: 'Это обязательное поле',
        })}
      />

      <div className={styles.passwordContainer}>
        <div className={styles.passwordContainerLink}>
          <span className={styles.customLabel}>Пароль</span>
          <Link to={'/default-path'} className={styles.forgotPasswordLink}>
            {' '}
            {/* добавил выбор пути, чтобы не было ошибки */}
            Забыли пароль?
          </Link>
        </div>
        <div className={styles.passwordInputWrapper}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            label=""
            error={errors.passwordValue?.message}
            className={styles.inputField}
            {...register('passwordValue', {
              required: 'Это обязательное поле',
            })}
          />
          <span
            role="button"
            tabIndex={0}
            className={styles.toggleIcon}
            onClick={togglePasswordVisibility}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                togglePasswordVisibility();
              }
            }}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <img
              src={showPassword ? EyeOffIcon : EyeIcon}
              alt="Toggle password visibility"
            />
          </span>
        </div>
      </div>
      <Button type="submit" className={styles.submitButton} onClick={() => {}}>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;

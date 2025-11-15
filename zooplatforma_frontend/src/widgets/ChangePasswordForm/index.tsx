import s from './style.module.scss';
import { useForm } from 'react-hook-form';
import Input from '../../shared/ui/Input';
import { useState } from 'react';
import EyeIcon from '../../shared/assets/icons/icon_eye2.svg';
import EyeOffIcon from '../../shared/assets/icons/icon_eye-closed.svg';
import Button from '../../shared/ui/Button';

interface ChangePasswordFormProps {
  currentPassword: string;
  newpassword: string;
  newpassword2: string;
}

export const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showNewPassword2, setNewShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setNewShowPassword(!showNewPassword);
  };
  const toggleNewPasswordVisibility2 = () => {
    setNewShowPassword2(!showNewPassword2);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ChangePasswordFormProps>({
    mode: 'onBlur',
  });

  const onSubmit = (data: ChangePasswordFormProps) => {
    console.log({
      currentPassword: data.currentPassword,
      newpassword: data.newpassword,
    });
    //запрос на сервер на изменение пароля
    // в зависимости от результата запроса
    //если введен неверный пароль открывается модальное окно с надписью неверный пароль
    // если пароль верный, то модальное окно с сообщением об успешном изменении пароля
    resetForm();
  };

  function resetForm() {
    reset();
  }

  function forgotPassword() {
    //отправка сообщения на электронную почту пользователя и открытия модального окна
    //с сообщением о том, что необходимо зайти на почту
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <div className={s.content}>
        <div className={s.FormInputs}>
          <div className={s.Section}>
            <div className={s.TitleSection}>
              <h3 className={s.Title}>Изменить пароль</h3>
              <p className={s.Hint}>Обновить пароль учетной записи</p>
            </div>
            <div className={s.profileInputs}>
              <div className={s.passwordInputWrapper}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  label="Текущий пароль"
                  {...register('currentPassword', {
                    required: 'Это обязательное поле',
                  })}
                  error={errors.currentPassword?.message}
                />
                <span
                  role="button"
                  tabIndex={0}
                  className={s.toggleIcon}
                  onClick={togglePasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      togglePasswordVisibility();
                    }
                  }}
                  aria-label={
                    showPassword ? 'Скрыть пароль' : 'Показать пароль'
                  }
                >
                  <img
                    src={showPassword ? EyeOffIcon : EyeIcon}
                    alt="Toggle password visibility"
                  />
                </span>
              </div>
              <div className={s.passwordInputWrapper}>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Введите пароль"
                  label="Новый пароль"
                  {...register('newpassword', {
                    required: 'Это обязательное поле',
                    minLength: {
                      value: 6,
                      message: 'Слишком короткий пароль',
                    },
                  })}
                  error={errors.newpassword?.message}
                />
                <span
                  role="button"
                  tabIndex={0}
                  className={s.toggleIcon}
                  onClick={toggleNewPasswordVisibility}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleNewPasswordVisibility();
                    }
                  }}
                  aria-label={
                    showNewPassword ? 'Скрыть пароль' : 'Показать пароль'
                  }
                >
                  <img
                    src={showNewPassword ? EyeOffIcon : EyeIcon}
                    alt="Toggle password visibility"
                  />
                </span>
              </div>
              <div className={s.passwordInputWrapper}>
                <Input
                  type={showNewPassword2 ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  label="Повторить пароль"
                  {...register('newpassword2', {
                    required: 'Это обязательное поле',
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { newpassword } = getValues();
                        return (
                          newpassword === value || 'Пароли должны совпадать'
                        );
                      },
                    },
                  })}
                  error={errors.newpassword2?.message}
                />
                <span
                  role="button"
                  tabIndex={0}
                  className={s.toggleIcon}
                  onClick={toggleNewPasswordVisibility2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleNewPasswordVisibility2();
                    }
                  }}
                  aria-label={
                    showNewPassword2 ? 'Скрыть пароль' : 'Показать пароль'
                  }
                >
                  <img
                    src={showNewPassword2 ? EyeOffIcon : EyeIcon}
                    alt="Toggle password visibility"
                  />
                </span>
              </div>
            </div>
            <div className={s.buttons}>
              <Button onClick={handleSubmit(onSubmit)} type="submit">
                Обновить пароль
              </Button>
              <button className={s.WhiteButton} onClick={forgotPassword}>
                Я забыл свой пароль
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

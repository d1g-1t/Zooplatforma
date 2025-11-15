import { Controller, useForm } from 'react-hook-form';
import styles from './style.module.scss';
import Title from '../../shared/ui/Title';
import { Link } from 'react-router-dom';
import Input from '../../shared/ui/Input';
import CustomCheckbox from '../../shared/ui/Checkbox';
import Button from '../../shared/ui/Button';
import { RegistrationFormProps } from './types.ts';
import { normalizePhoneNumber } from '../../shared/utils/normalizePhoneNumber.ts';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
}: RegistrationFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<RegistrationFormProps>({
    mode: 'onBlur',
  });
  const handleMask = (event: { target: { value: string } }) => {
    event.target.value = normalizePhoneNumber(event.target.value);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
      className={`${styles.registrationForm}`}
    >
      <Title level={2} className={styles.title}>
        Регистрация
      </Title>
      <Title level={3} className={styles.registrationPrompt}>
        {' '}
        У вас уже есть аккаунт?{' '}
        <Link to={'/authorization'} className={styles.registrationLink}>
          Войти
        </Link>
      </Title>

      <Input
        type="text"
        placeholder="Введите имя"
        label="Имя"
        {...register('first_name', {
          required: 'Это обязательное поле',
        })}
        name="first_name"
        error={errors.first_name?.message}
      />

      <Input
        type="text"
        placeholder="Введите фамилию"
        label="Фамилия"
        {...register('lastName', { required: 'Это обязательное поле' })}
        name="lastName"
        error={errors.lastName?.message}
      />

      <Input
        type="email"
        placeholder="Введите email"
        label="Email"
        {...register('email', {
          required: 'Это обязательное поле',
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Некорректный email ',
          },
        })}
        name="email"
        error={errors.email?.message}
      />

      <Input
        type="tel"
        placeholder="Введите телефон"
        label="Номер телефона"
        {...register('phone', {
          required: 'Это обязательное поле',
        })}
        name="phone"
        error={errors.phone?.message}
        onChange={handleMask}
        maxLength={12}
      />

      <Input
        type="password"
        placeholder="Введите пароль"
        label="Пароль"
        {...register('password', {
          required: 'Это обязательное поле',
          minLength: {
            value: 6,
            message: 'Слишком короткий пароль',
          },
        })}
        name="password"
        error={errors.password?.message}
      />

      <Input
        type="password"
        placeholder="Повторите пароль"
        label="Повторите пароль"
        {...register('password2', {
          required: 'Это обязательное поле',
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || 'Пароли должны совпадать';
            },
          },
        })}
        name="password2"
        error={errors.password2?.message}
      />

      <Controller
        name={'acceptTerms'}
        control={control}
        rules={{ required: 'Вы должны согласиться с условиями' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomCheckbox onChange={onChange} checked={value}>
            <p>
              Соглашаюсь на обработку моих персональных данных, с{' '}
              <Link to="https://www.ldoceonline.com/">
                Правилами пользования сайтом
              </Link>{' '}
              и принимаю{' '}
              <Link to="https://www.ldoceonline.com/">
                Пользовательское соглашение
              </Link>
              .
            </p>
            {error && <div className={styles.error}>{error?.message}</div>}
          </CustomCheckbox>
        )}
      />
      <Button type="submit" onClick={() => {}}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegistrationForm;

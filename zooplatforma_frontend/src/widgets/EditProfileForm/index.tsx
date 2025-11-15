import EditFormHeader from '../../widgets/Header/EditFormHeader/index.tsx';
import Input from '../../shared/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import s from './style.module.scss';
import UploadFile from '../../entities/ui/UploadFile/index.tsx';
import Textarea from '../../shared/ui/Textarea/index.tsx';
import CustomCheckbox from '../../shared/ui/Checkbox/index.tsx';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { updateFormField } from '../../store/reducers/editProfileFormSlice.ts';
import { EditProfileFormProps } from './types.ts';
import { normalizePhoneNumber } from '../../shared/utils/normalizePhoneNumber.ts';

export const EditProfileForm = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.editProfileFormSlice);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormProps>({
    defaultValues: {
      firstName: formState.firstName,
      lastName: formState.lastName,
      address: formState.address,
      email: formState.email,
      phone: formState.phone,
      title: formState.title,
      description: formState.description,
      hideEmail: formState.hideEmail,
      hidePhone: formState.hidePhone,
      attachedPhoto: formState.attachedPhoto,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: EditProfileFormProps) => {
    // Отправляем все изменения в store
    console.log(data);
    dispatch(updateFormField(data));
    // надо отправить data на сервер
  };

  function resetForm() {
    reset();
  }
  const handleMask = (event: { target: { value: string } }) => {
    event.target.value = normalizePhoneNumber(event.target.value);
  };
  return (
    <form
      className={s.Form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <EditFormHeader
        textTitle="Мой профиль"
        textButtonSave="Сохранить"
        textButtonReset="Отмена"
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetForm}
      />
      <div className={s.content}>
        <div className={s.FormInputs}>
          <div className={s.Section}>
            <div className={s.TitleSection}>
              <h3 className={s.Title}>Основное</h3>
              <p className={s.Hint}>
                Ваша персональная и контактная информация
              </p>
            </div>
            <div className={s.profileInputs}>
              <Input
                type="text"
                label="Имя"
                error={errors.firstName?.message}
                {...register('firstName', {
                  required: 'Это обязательное поле',
                })}
              />
              <Input
                type="text"
                label="Фамилия"
                error={errors.lastName?.message}
                {...register('lastName', {
                  required: 'Это обязательное поле',
                })}
              />
              <Input
                type="text"
                label="Адрес"
                error={errors.address?.message}
                {...register('address')}
              />
              <Input
                type="email"
                label="Email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Это обязательное поле',
                })}
              />
              <Controller
                name={'hideEmail'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomCheckbox onChange={onChange} checked={value}>
                    Скрыть email
                  </CustomCheckbox>
                )}
              />
              <Input
                type="tel"
                label="Телефон"
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Это обязательное поле',
                })}
                onChange={handleMask}
                maxLength={12}
              />
              <Controller
                name={'hidePhone'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CustomCheckbox onChange={onChange} checked={value}>
                    Скрыть телефон
                  </CustomCheckbox>
                )}
              />
            </div>
          </div>
          <div className={`${s.Section} ${s.SectionDescription}`}>
            <div className={s.TitleSection}>
              <h3 className={s.Title}>Описание</h3>
              <p className={s.Hint}>Расскажите о себе</p>
            </div>
            <div className={s.profileInputs}>
              <Input
                placeholder="Всем привет"
                type="text"
                label="Заголовок"
                error={errors.title?.message}
                {...register('title')}
              />
              <Textarea
                {...register('description')}
                label="Текст"
                placeholder="Меня зовут..."
              />
            </div>
          </div>
        </div>
        <div className={s.formPhoto}>
          <div className={s.TitleSection}>
            <h3 className={s.Title}>Фото профиля</h3>
            <p className={s.Hint}>Фотография вашего профиля</p>
          </div>
          <Controller
            name="attachedPhoto"
            control={control}
            render={({ field }) => (
              <UploadFile value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>
    </form>
  );
};

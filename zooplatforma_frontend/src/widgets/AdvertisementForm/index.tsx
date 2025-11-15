import React from 'react';
import Input from '../../shared/ui/Input';
import Select from '../../shared/ui/Select';
import styles from './style.module.scss';
import { AdvertisementFormProps } from './types';
import ImageUpload from '../../entities/ui/ImageUpload/';
import Textarea from '../../shared/ui/Textarea';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { updateFormField } from '../../store/reducers/advertisementSlice.ts';
import {
  petCityList,
  petGenderList,
  petPlaceList,
  petStatusList,
} from './mock-data.ts';
import { normalizePhoneNumber } from '../../shared/utils/normalizePhoneNumber.ts';

export const Separator = () => {
  return <div className={styles.separator}></div>;
};

const AdvertisementForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((formState) => formState.advertisement);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdvertisementFormProps>({
    defaultValues: {
      advertisementTitleValue: formState.advertisementTitleValue,
      advertisementDescriptionValue: formState.advertisementDescriptionValue,
      advertisementPetInfoPetStatus: formState.advertisementPetInfoPetStatus,
      advertisementPetInfoPetNickname:
        formState.advertisementPetInfoPetNickname,
      advertisementPetInfoPetType: formState.advertisementPetInfoPetType,
      advertisementPetInfoPetGender: formState.advertisementPetInfoPetGender,
      advertisementPetInfoPetBreed: formState.advertisementPetInfoPetBreed,
      advertisementPetInfoPetColor: formState.advertisementPetInfoPetColor,
      advertisementPetInfoPetCity: formState.advertisementPetInfoPetCity,
      advertisementPetInfoPetPlace: formState.advertisementPetInfoPetPlace,
      advertisementCuratorValue: formState.advertisementCuratorValue,
      advertisementNecessaryAmountValue:
        formState.advertisementNecessaryAmountValue,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: AdvertisementFormProps) => {
    // Отправляем все изменения в store
    console.log(data);
    dispatch(updateFormField(data));
    reset();
  };
  const handleMask = (event: { target: { value: string } }) => {
    event.target.value = normalizePhoneNumber(event.target.value);
  };
  return (
    <form
      className={styles.advertisementForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <div className={styles.advertisementInfoBlock}>
        <div className={styles.advertisementSection}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Название объявления</span>
            <p className={styles.description}>
              Не используйте в названии Caps Lock, а также слова “Срочно” ...
            </p>
          </div>
          <Input
            type="text"
            placeholder=""
            error={errors.advertisementTitleValue?.message}
            {...register('advertisementTitleValue', {
              required: 'Это обязательное поле',
            })}
            className={styles.inputField}
          />
        </div>

        <Separator />

        <div className={styles.advertisementSection}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Описание</span>
            <p className={styles.description}>
              Подробно опишите возникшую ситуацию
            </p>
          </div>
          <Textarea
            label=""
            placeholder="Подробное описание..."
            error={errors.advertisementDescriptionValue?.message}
            {...register('advertisementDescriptionValue', {
              required: 'Это обязательное поле',
            })}
          />
        </div>

        <Separator />

        <div className={styles.advertisementSection}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Данные о животном</span>
            <p className={styles.description}>
              Добавьте имеющуюся информацию о животном
            </p>
          </div>
          <div className={styles.inputsBlock}>
            <span className={styles.customLabel}>Питомец</span>
            <Controller
              name="advertisementPetInfoPetStatus"
              control={control}
              defaultValue={formState.advertisementPetInfoPetStatus}
              rules={{
                required: 'Выберите статус питомца',
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    label=""
                    selected={field.value}
                    options={petStatusList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(
                        updateFormField({
                          advertisementPetInfoPetStatus: value,
                        })
                      );
                    }}
                  />
                </>
              )}
            />
            <Input
              type="text"
              label="Кличка"
              placeholder=""
              error={errors.advertisementPetInfoPetNickname?.message}
              {...register('advertisementPetInfoPetNickname', {
                required: 'Это обязательное поле',
              })}
              className={styles.inputField}
            />

            <Input
              type="text"
              label="Вид"
              placeholder=""
              error={errors.advertisementPetInfoPetType?.message}
              {...register('advertisementPetInfoPetType', {
                required: 'Это обязательное поле',
              })}
              className={styles.inputField}
            />
            <div className={styles.selectBlock}>
              <span className={styles.customLabel}>Пол</span>
              <Controller
                name="advertisementPetInfoPetGender"
                control={control}
                defaultValue={formState.advertisementPetInfoPetGender}
                rules={{
                  required: 'Выберите пол питомца',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label=""
                    selected={field.value}
                    options={petGenderList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(
                        updateFormField({
                          advertisementPetInfoPetGender: value,
                        })
                      );
                    }}
                  />
                )}
              />
            </div>
            <Input
              type="text"
              label="Порода"
              placeholder=""
              error={errors.advertisementPetInfoPetBreed?.message}
              {...register('advertisementPetInfoPetBreed', {
                required: 'Это обязательное поле',
              })}
              className={styles.inputField}
            />
            <Input
              type="text"
              label="Масть"
              placeholder=""
              error={errors.advertisementPetInfoPetColor?.message}
              {...register('advertisementPetInfoPetColor', {
                required: 'Это обязательное поле',
              })}
              className={styles.inputField}
            />
            <div className={styles.selectBlock}>
              <span className={styles.customLabel}>Город</span>
              <Controller
                name="advertisementPetInfoPetCity"
                control={control}
                defaultValue={formState.advertisementPetInfoPetCity}
                rules={{
                  required: 'Выберите город',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label=""
                    selected={field.value}
                    options={petCityList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(
                        updateFormField({ advertisementPetInfoPetCity: value })
                      );
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.selectBlock}>
              <span className={styles.customLabel}>Место содержания</span>
              <Controller
                name="advertisementPetInfoPetPlace"
                control={control}
                defaultValue={formState.advertisementPetInfoPetPlace}
                rules={{
                  required: 'Выберите место содержания питомца',
                }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label=""
                    selected={field.value}
                    options={petPlaceList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(
                        updateFormField({ advertisementPetInfoPetPlace: value })
                      );
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className={styles.advertisementSection}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Сокуратор</span>
            <p className={styles.description}>
              Выберите второго куратора по данному объявлению
            </p>
          </div>
          <Input
            type="tel"
            label=""
            placeholder="Введите номер телефона куратора"
            error={errors.advertisementCuratorValue?.message}
            {...register('advertisementCuratorValue', {
              required: 'Это обязательное поле',
            })}
            className={styles.inputField}
            onChange={handleMask}
            maxLength={12}
          />
        </div>

        <Separator />

        <div className={styles.advertisementSection}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Необходимая сумма</span>
            <p className={styles.description}>
              Укажите сумму в рублях, которую необходимо собрать
            </p>
          </div>
          <Input
            type="number"
            label=""
            placeholder=""
            error={errors.advertisementNecessaryAmountValue?.message}
            {...register('advertisementNecessaryAmountValue', {
              required: 'Это обязательное поле',
            })}
            className={styles.inputField}
          />
        </div>
      </div>

      <div className={styles.advertisementMediaBlock}>
        <div className={styles.advertisementSectionMediaBlock}>
          <div className={styles.titleblock}>
            <span className={styles.title}>Фото / Видео</span>
            <p className={styles.description}>
              Загрузите минимум 3 медиа файла
            </p>
          </div>
          <div>
            <Controller
              name="advertisementGallery"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <ImageUpload
                  value={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdvertisementForm;

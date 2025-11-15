import type { NewPetEntryFormProps } from './types';
import styles from './style.module.scss';
import { FormHeader } from './FormHeader';
import Select from '../../shared/ui/Select';
import Input from '../../shared/ui/Input';
import { PlusButton } from './PlusButton';
import UploadFile from '../../entities/ui/UploadFile';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { Controller, useForm } from 'react-hook-form';
import { updateFormField } from '../../store/reducers/newPetFormSlice.ts';
import CustomCheckbox from '../../shared/ui/Checkbox';
import { MedicalRecord } from './MedicalRecord';
import { ReminderFrequency } from './VaccinationForm/types.ts';
import { frequencies, vaccines, vacSubjects } from './mock-data.ts';
import { MarkingForm } from './MarkingForm/index.tsx';
import {
  AnimalState,
  updateAnimalProfile,
} from '../../store/reducers/animalSlice.ts';

export const NewPetEntryForm = ({ className, data }: NewPetEntryFormProps) => {
  const dispatch = useAppDispatch();
  // кажется надо из всех трех слайсов сделать один,
  // чтобы можно было отправлять данные о новом питомце на сервер
  const formState = useAppSelector((state) => state.animalSlice).animal;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnimalState>({
    defaultValues: {
      ownershipStatus: formState.ownershipStatus,
      petType: formState.petType,
      petGender: formState.petGender,
      petNameValue: formState.petNameValue,
      petBreedValue: formState.petBreedValue,
      petColorValue: formState.petColorValue,
      petBirthdateValue: formState.petBirthdateValue,
      petBirthdayIsApproximate: formState.petBirthdayIsApproximate,
      petChipValue: {
        value: formState.petChipValue.value,
        verified: formState.petChipValue.verified,
      },
      petTagValue: {
        value: formState.petTagValue.value,
        verified: formState.petTagValue.verified,
      },
      petBrandValue: {
        value: formState.petBrandValue.value,
        verified: formState.petBrandValue.verified,
      },
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: Partial<AnimalState>) => {
    // Отправляем все изменения в store
    console.log(data);
    dispatch(updateAnimalProfile(data));
    reset();
  };

  return (
    <>
      <form
        className={`${styles.NewPetForm} ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <FormHeader
          title="Новый Питомец"
          abortTitle="Отмена"
          submitTitle="Добавить питомца"
          onSubmit={handleSubmit(onSubmit)}
        />
        <div className={styles.FormMain}>
          <div className={styles.FormInputs}>
            <div className={styles.StatusArea}>
              <div className={styles.TitleSection}>
                <h3 className={styles.Title}>Статус владения</h3>
                <p className={styles.Hint}>
                  Укажите статус владения для этого питомца
                </p>
              </div>

              <Controller
                name="ownershipStatus"
                control={control}
                defaultValue={formState.ownershipStatus}
                rules={{ required: 'Выберите статус владения' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label=""
                    selected={field.value}
                    options={data.ownershipStatusList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(updateFormField({ ownershipStatus: value }));
                    }}
                  />
                )}
              />
              <PlusButton
                text="Добавить еще одного владельца"
                onClick={() => console.log('Добавить еще одного владельца')}
              />
            </div>
            <div className={styles.PassportArea}>
              <div className={styles.TitleSection}>
                <h3 className={styles.Title}>Паспорт питомца</h3>
                <p className={styles.Hint}>Добавьте информацию о питомце</p>
              </div>
              <div className={styles.InputsHorizontal}>
                <Input
                  type="text"
                  label="Кличка"
                  placeholder="Кличка"
                  error={errors.petNameValue?.message}
                  {...register('petNameValue', {
                    required: 'Это обязательное поле',
                  })}
                />
                <Controller
                  name="petType"
                  control={control}
                  defaultValue={formState.petType}
                  rules={{ required: 'Выберите вид питомца' }}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      label="Вид"
                      selected={field.value}
                      options={data.petTypeList}
                      error={error?.message}
                      onChange={(value) => {
                        field.onChange(value);
                        dispatch(updateFormField({ petType: value }));
                      }}
                    />
                  )}
                />
              </div>
              <Controller
                name="petGender"
                control={control}
                defaultValue={formState.petGender}
                rules={{ required: 'Выберите пол питомца' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    label="Пол"
                    selected={field.value}
                    options={data.petGenderList}
                    error={error?.message}
                    onChange={(value) => {
                      field.onChange(value);
                      dispatch(updateFormField({ petGender: value }));
                    }}
                  />
                )}
              />
              <Input
                type="text"
                label="Порода"
                placeholder="Порода"
                error={errors.petBreedValue?.message}
                {...register('petBreedValue', {
                  required: 'Это обязательное поле',
                })}
              />
              <Input
                type="text"
                label="Масть"
                placeholder="Масть"
                error={errors.petColorValue?.message}
                {...register('petColorValue', {
                  required: 'Это обязательное поле',
                })}
              />
              <Input
                type="text"
                label="Дата рождения"
                placeholder="00.00.0000"
                error={errors.petBirthdateValue?.message}
                {...register('petBirthdateValue', {
                  required: 'Это обязательное поле',
                })}
              />
              <Controller
                name={'petBirthdayIsApproximate'}
                control={control}
                render={({ field: { onChange } }) => (
                  <CustomCheckbox onChange={onChange}>
                    Примерная дата рождения
                  </CustomCheckbox>
                )}
              />
            </div>

            <div className={styles.MarkingArea}>
              <div className={styles.TitleSection}>
                <h3 className={styles.Title}>Маркировка</h3>
                <p className={styles.Hint}>
                  Укажите тип и номер маркировки питомца
                </p>
              </div>
              <MarkingForm
                formStateMarking={formState}
                errors={errors}
                register={register}
              />
            </div>

            <div className={styles.MedicalCardArea}>
              <div className={styles.TitleSection}>
                <h3 className={styles.Title}>Медицинская карта</h3>
                <p className={styles.Hint}>
                  Добавьте прививки и/или обработки питомца
                </p>
              </div>
              <MedicalRecord
                data={
                  data.vaccinationFormData ?? {
                    subject: vacSubjects[0],
                    subjectOptions: vacSubjects,
                    date: '01.01.0001',
                    vaccineOptions: vaccines,
                    vaccine: vaccines[0],
                    createReminderIsSet: true,
                    onCreateReminderChange: () => {},
                    reminderFrequency: ReminderFrequency.Once,
                    reminderFrequencyOptions: frequencies,
                    reminderDate: '01.02.0001',
                  }
                }
                Vaccinations={formState.petVaccinationValue}
              />
            </div>
          </div>
          <div className={styles.FormPhoto}>
            <Controller
              name="attachedPhoto"
              control={control}
              render={({ field }) => (
                <UploadFile
                  title="Фото животного"
                  value={field.value} // Передаем значение в UploadFile
                  onChange={field.onChange} // Связываем onChange с Controller
                />
              )}
            />
          </div>
        </div>
      </form>
    </>
  );
};

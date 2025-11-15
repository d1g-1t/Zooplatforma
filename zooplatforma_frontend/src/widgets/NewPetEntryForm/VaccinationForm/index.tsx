import {
  type VaccinationFormProps,
  VaccinationType,
  ReminderFrequency,
  VaccinationFormData,
} from './types';
import styles from './style.module.scss';
import Select from '../../../shared/ui/Select';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store.ts';
import CustomCheckbox from '../../../shared/ui/Checkbox';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import {
  addVaccination,
  updateVaccinationForm,
} from '../../../store/reducers/animalSlice.ts';

export const VaccinationForm = ({
  type,
  className,
  data,
}: VaccinationFormProps) => {
  const formState = useAppSelector((state) => state.animalSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<VaccinationFormData>({
    defaultValues: {
      subject: formState.subject,
      date: formState.date,
      vaccine: formState.vaccine,
      createReminderIsSet: formState.createReminderIsSet,
      reminderFrequency: formState.reminderFrequency,
      reminderDate: formState.reminderDate,
    },
    mode: 'onBlur',
  });
  const createReminderIsSet = watch('createReminderIsSet');
  const inputDate = watch('date');

  const parsedDate = dayjs(inputDate, 'DD.MM.YYYY').format('DD.MM.YYYY');
  let nextVaccinationDate = '';

  useEffect(() => {
    nextVaccinationDate = dayjs(parsedDate).add(1, 'M').format('DD.MM.YYYY');
  }, [inputDate]);

  const titleString =
    type === VaccinationType.Vaccination
      ? 'Новая вакцинация'
      : 'Новая обработка';
  const typeString =
    type === VaccinationType.Vaccination ? 'Тип вакцинации' : 'Тип обработки';
  const buttonString =
    type === VaccinationType.Vaccination
      ? 'Добавить вакцинацию'
      : 'Добавить обработку';
  const onSubmit = (values: VaccinationFormData) => {
    dispatch(updateVaccinationForm(values));
    dispatch(addVaccination());
    // const animalProfileNew = useAppSelector((state) => state.animalSlice);
    //отправить обновленный animalProfileNew на сервер
    // или делать post запрос на обновление части информации
    reset();
  };

  return (
    <form
      className={`${styles.VaccinationForm} ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(onSubmit)();
      }}
    >
      <div className={styles.Header}>
        <h2 className={styles.Title}>{titleString}</h2>
      </div>
      <div className={styles.Sections}>
        <div className={`${styles.Vertical} ${styles.Section}`}>
          <div className={styles.Horizontal}>
            <Controller
              name="subject"
              defaultValue={formState.subject}
              control={control}
              rules={{ required: 'Выберите тип обработки' }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label={typeString}
                  selected={field.value}
                  options={data!.subjectOptions}
                  error={error?.message}
                  onChange={(value) => {
                    field.onChange(value);
                    dispatch(updateVaccinationForm({ subject: value }));
                  }}
                />
              )}
            />
            <Input
              type="text"
              label="Дата"
              placeholder="00.00.0000"
              error={errors.date?.message}
              {...register('date', {
                required: 'Это обязательное поле',
              })}
            />
          </div>
          <Controller
            name="vaccine"
            defaultValue={formState.vaccine}
            control={control}
            rules={{ required: 'Выберите средство для обработки' }}
            render={({ field, fieldState: { error } }) => (
              <Select
                label="Средство"
                selected={field.value}
                options={data!.vaccineOptions}
                error={error?.message}
                onChange={(value) => {
                  field.onChange(value);
                  dispatch(updateVaccinationForm({ vaccine: value }));
                }}
              />
            )}
          />

          <Controller
            name={'createReminderIsSet'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomCheckbox onChange={onChange} checked={value}>
                Создать напоминание
              </CustomCheckbox>
            )}
          />
        </div>
        {createReminderIsSet && (
          <div className={`${styles.Horizontal} ${styles.Section}`}>
            <Controller
              name="reminderFrequency"
              defaultValue={formState.reminderFrequency}
              control={control}
              render={({ field }) => (
                <Select
                  label="Частота напоминаний"
                  selected={field.value ?? ''}
                  options={data!.reminderFrequencyOptions}
                  onChange={(value) => {
                    field.onChange(value);
                    dispatch(updateVaccinationForm({ vaccine: value }));
                  }}
                />
              )}
            />
            {formState.reminderFrequency === ReminderFrequency.Once && (
              <Input
                type="text"
                label="Когда"
                placeholder="00.00.0000"
                error={errors.reminderDate?.message}
                {...register('reminderDate', {
                  required: 'Это обязательное поле',
                })}
                value={nextVaccinationDate}
              />
            )}
          </div>
        )}
        <div className={styles.Buttons}>
          <Button
            color="primary"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className={styles.SubmitButton}
          >
            {buttonString}
          </Button>
          <Button
            color="outline-blue"
            onClick={() => {
              reset();
            }}
            className={styles.AbortButton}
          >
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
};

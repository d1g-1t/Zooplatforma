import s from './style.module.scss';
import Button from '../../shared/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import UploadFile from '../../entities/ui/UploadFile';
import Input from '../../shared/ui/Input';
import { useAppDispatch, useAppSelector } from '../../store/store.ts';
import { useState } from 'react';
import { MarkingVerification } from '../../widgets/NewPetEntryForm/MarkingVerification/index.tsx';
import icon_clock from '../../shared/assets/icons/icon_clock.svg';
import {
  frequencies,
  vaccines,
  vacSubjects,
} from '../../widgets/NewPetEntryForm/mock-data.ts';
import { MedicalRecord } from '../../widgets/NewPetEntryForm/MedicalRecord/index.tsx';
import { ReminderFrequency } from '../../widgets/NewPetEntryForm/VaccinationForm/types.ts';
import { NewPetEntryFormProps } from '../../widgets/NewPetEntryForm/types.ts';
import { MarkingForm } from '../../widgets/NewPetEntryForm/MarkingForm/index.tsx';
import {
  AnimalState,
  updateAnimalProfile,
} from '../../store/reducers/animalSlice.ts';

export const ProfileAnimal = ({ data }: NewPetEntryFormProps) => {
  //const { id } = useParams<{ number: string }>();
  // по id делать запрос на сервер и получать всю инфу о питомце
  const dispatch = useAppDispatch();
  /* useEffect(() => {
    dispatch(fetchAnimalNumber(1));
  }, []);  */

  const animalProfile = useAppSelector((state) => state.animalSlice).animal;
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [medCardOpen, setMedCardOpen] = useState(false);
  const [markingOpen, setMarkingOpen] = useState(false);
  const [inputColor, setInputColor] = useState('rgba(237, 240, 247, 20%)');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalState>({
    defaultValues: {
      id: animalProfile.id,
      petType: animalProfile.petType,
      petGender: animalProfile.petGender,
      petNameValue: animalProfile.petNameValue,
      petBreedValue: animalProfile.petBreedValue,
      petColorValue: animalProfile.petColorValue,
      petBirthdateValue: animalProfile.petBirthdateValue,
      petBirthdayIsApproximate: animalProfile.petBirthdayIsApproximate,
      petChipValue: animalProfile.petChipValue,
      petTagValue: animalProfile.petTagValue,
      petBrandValue: animalProfile.petBrandValue,
      petVaccinationValue: animalProfile.petVaccinationValue,
      attachedPhoto: animalProfile.attachedPhoto,
    },
    mode: 'onBlur',
  });
  const onSubmit = (data: Partial<AnimalState>) => {
    setInputDisabled(isInputDisabled ? false : true);
    console.log(data);
    dispatch(updateAnimalProfile(data));
    setInputColor(
      inputColor === 'rgba(237, 240, 247, 20%)'
        ? 'white'
        : 'rgba(237, 240, 247, 20%)'
    );
    // const animalProfileNew = useAppSelector((state) => state.animalSlice);
    //отправить обновленный animalProfileNew на сервер
    // или делать post запрос на обновление части информации
  };
  const editButtonClick = () => {
    setMarkingOpen(true);
    setMedCardOpen(true);
    setInputDisabled(isInputDisabled ? false : true);
    setInputColor(
      inputColor === 'rgba(237, 240, 247, 20%)'
        ? 'white'
        : 'rgba(237, 240, 247, 20%)'
    );
  };
  return (
    <div className={s.ProfileAnimalWrapper}>
      <div className={s.TopLine}></div>
      <form
        className={s.Form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <div className={s.Header}>
          <Controller
            name="attachedPhoto"
            control={control}
            render={({ field }) => (
              <UploadFile
                className={s.Photo}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <div>
            <h1 className={s.Title}>
              <Input
                type="text"
                disabled={isInputDisabled}
                classInput={s.inputTitle}
                error={errors.petNameValue?.message}
                {...register('petNameValue', {
                  required: 'Это обязательное поле',
                })}
              />
            </h1>
            <div className={s.HeaderTitle}>
              <img src={icon_clock} alt="Иконка фото" />
              <div className={s.SubTitle}>
                Временный владелец
                <div className={s.popup}>
                  <h3 className={s.popupTitle}>Временное владение</h3>
                  <p className={s.popupText}>
                    Статус присваивается на 6 месяцев после регистрации питомца.
                    По окончании данного периода, питомец будет полностью
                    принадлежать вам.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.Contetnt}>
          <div className={s.Section}>
            <div className={`${s.SectionTitle} ${s.SectionPassport}`}>
              Паспорт
            </div>
            <dl className={s.SectionTable}>
              <dt className={s.Heading}>Статус</dt>
              <dd className={`${s.Contents} ${s.NotEdit}`}>
                <MarkingVerification verified={false} onClick={() => {}} />
                {/* verified надо загружать информацию с сервера */}
              </dd>
              <dt className={s.Heading}>ID</dt>
              <dd className={`${s.Contents} ${s.NotEdit}`}>
                {animalProfile.id}
              </dd>
              <dt className={s.Heading}>Вид</dt>
              <dd className={s.Contents}>
                <Input
                  disabled={isInputDisabled}
                  type="text"
                  style={{ backgroundColor: inputColor }}
                  classInput={s.input}
                  error={errors.petType?.message}
                  {...register('petType', {
                    required: 'Это обязательное поле',
                  })}
                />
              </dd>
              <dt className={s.Heading}>Пол</dt>
              <dd className={s.Contents}>
                <Input
                  disabled={isInputDisabled}
                  style={{ backgroundColor: inputColor }}
                  classInput={s.input}
                  type="text"
                  error={errors.petGender?.message}
                  {...register('petGender', {
                    required: 'Это обязательное поле',
                  })}
                />
              </dd>
              <dt className={s.Heading}>Порода</dt>
              <dd className={s.Contents}>
                <Input
                  style={{ backgroundColor: inputColor }}
                  disabled={isInputDisabled}
                  classInput={s.input}
                  type="text"
                  error={errors.petBreedValue?.message}
                  {...register('petBreedValue', {
                    required: 'Это обязательное поле',
                  })}
                />
              </dd>
              <dt className={s.Heading}>Масть</dt>
              <dd className={s.Contents}>
                <Input
                  style={{ backgroundColor: inputColor }}
                  disabled={isInputDisabled}
                  classInput={s.input}
                  type="text"
                  error={errors.petColorValue?.message}
                  {...register('petColorValue', {
                    required: 'Это обязательное поле',
                  })}
                />
              </dd>
              <dt className={s.Heading}>Дата рождения</dt>
              <dd className={s.Contents}>
                <Input
                  style={{ backgroundColor: inputColor }}
                  disabled={isInputDisabled}
                  classInput={s.input}
                  type="text"
                  error={errors.petBirthdateValue?.message}
                  {...register('petBirthdateValue', {
                    required: 'Это обязательное поле',
                  })}
                />
              </dd>
            </dl>
          </div>
          <div className={s.Section}>
            <div className={s.SectionDescription}>
              <div className={s.SectionTitle}>Маркировка</div>
              <Button
                style={{ color: 'var(--color-main)', padding: 0, margin: 0 }}
                onClick={() => {
                  setMarkingOpen(!markingOpen);
                }}
                color="none-border"
              >
                {markingOpen ? 'Скрыть' : 'Показать'}
              </Button>
            </div>
            {markingOpen ? (
              <MarkingForm
                inputColor={inputColor}
                isInputDisabled={isInputDisabled}
                formStateMarking={{
                  petChipValue: animalProfile.petChipValue,
                  petTagValue: animalProfile.petTagValue,
                  petBrandValue: animalProfile.petBrandValue,
                }}
                errors={errors}
                register={register}
              />
            ) : (
              ''
            )}
          </div>
          <div className={s.Section}>
            <div className={s.SectionDescription}>
              <div className={s.SectionTitle}>Медицинская карта</div>
              <Button
                style={{ color: 'var(--color-main)', padding: 0, margin: 0 }}
                onClick={() => {
                  setMedCardOpen(!medCardOpen);
                }}
                color="none-border"
              >
                {/* Добавить */}
                {medCardOpen ? 'Скрыть' : 'Показать'}
              </Button>
            </div>
            {medCardOpen ? (
              <div className={s.MedicalCardArea}>
                <MedicalRecord
                  Vaccinations={animalProfile.petVaccinationValue}
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
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={s.ButtonsBlock}>
            {isInputDisabled ? (
              <Button onClick={editButtonClick}>Редактировать</Button>
            ) : (
              <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
            )}
            {/*  <Button onClick={() => {}} color="outline-blue">
                Передать питомца
              </Button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

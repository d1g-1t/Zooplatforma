import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import UploadFile from '../../entities/ui/UploadFile';
import Title from '../../shared/ui/Title';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { updateFormField } from '../../store/reducers/newPetFormSlice.ts';
import { useAppDispatch } from '../../store/store.ts';
import CustomCheckbox from '../../shared/ui/Checkbox';
import { FormState } from './types.ts';
import { normalizePhoneNumber } from '../../shared/utils/normalizePhoneNumber.ts';

const NewPetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormState) => {
    // Отправляем все изменения в store
    console.log(data);
    dispatch(updateFormField(data));
  };

  const [activeSection, setActiveSection] = useState<string>('passport');
  const sectionsRef = {
    passport: useRef<HTMLElement>(null),
    marking: useRef<HTMLElement>(null),
    medical: useRef<HTMLElement>(null),
    owner: useRef<HTMLElement>(null),
  };

  const scrollToSection = (sectionId: keyof typeof sectionsRef) => {
    sectionsRef[sectionId].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionsRef).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  const handleAddAnimal = () => {
    console.log('Add animal clicked');
  };

  const handleMask = (event: { target: { value: string } }) => {
    event.target.value = normalizePhoneNumber(event.target.value);
  };

  return (
    <div className={styles.form__container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <div className={styles.form__header}>
          <Title level={2}>Новая запись</Title>

          <div className={styles.buton__container}>
            <Button
              label="Отмена"
              onClick={handleCancel}
              color="outline-blue"
              className={styles.button}
            >
              Отмена
            </Button>

            <Button
              label="Сохранить"
              onClick={handleSave}
              color="outline-blue"
              className={styles.button}
            >
              Сохранить
            </Button>

            <Button
              label="Добавить животное"
              onClick={handleAddAnimal}
              color="primary"
              className={styles.button}
              type="submit"
            >
              Добавить животное
            </Button>
          </div>
        </div>

        <section
          ref={sectionsRef.passport}
          id="passport"
          className={styles.inputs__container}
        >
          <Title className={styles.inputs__title} level={3}>
            Паспорт животного
          </Title>
          <Input
            type="text"
            label="Кличка"
            error={errors.name?.message}
            {...register('name', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Вид"
            error={errors.species?.message}
            {...register('species', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Порода"
            error={errors.breed?.message}
            {...register('breed', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Пол"
            error={errors.gender?.message}
            {...register('gender', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Дата рождения"
            error={errors.birthDate?.message}
            {...register('birthDate', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Масть"
            error={errors.color?.message}
            {...register('color', {
              required: 'Это обязательное поле',
            })}
          />

          <Controller
            name={'isPurebred'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomCheckbox onChange={onChange} checked={value}>
                Племенные данные
              </CustomCheckbox>
            )}
          />
        </section>

        <Controller
          name="attachedPhoto"
          control={control}
          render={({ field }) => (
            <UploadFile
              title="Animal Photo"
              value={field.value} // Передаем значение в UploadFile
              onChange={field.onChange} // Связываем onChange с Controller
            />
          )}
        />

        <section
          ref={sectionsRef.marking}
          id="marking"
          className={styles.inputs__container}
        >
          <Title className={styles.inputs__title} level={3}>
            Маркировка
          </Title>
          <Input
            type="text"
            label="Номер чипа"
            error={errors.chipNumber?.message}
            {...register('chipNumber', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Номер бирки"
            error={errors.tagNumber?.message}
            {...register('tagNumber', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Номер клейма"
            error={errors.tattooNumber?.message}
            {...register('tattooNumber', {
              required: 'Это обязательное поле',
            })}
          />
        </section>

        <section
          ref={sectionsRef.medical}
          id="medical"
          className={styles.inputs__container}
        >
          <Title level={3} className={styles.inputs__title}>
            Медицинская карта
          </Title>
          <Input
            type="text"
            label="Диагноз"
            error={errors.diagnosis?.message}
            {...register('diagnosis', {
              required: 'Это обязательное поле',
            })}
          />
        </section>

        <section
          ref={sectionsRef.owner}
          id="owner"
          className={styles.inputs__container}
        >
          <Title level={3} className={styles.inputs__title}>
            Владелец
          </Title>
          <Input
            type="text"
            label="Имя"
            error={errors.ownerFirstName?.message}
            {...register('ownerFirstName', {
              required: 'Это обязательное поле',
            })}
          />
          <Input
            type="text"
            label="Фамилия"
            error={errors.ownerLastName?.message}
            {...register('ownerLastName', {
              required: 'Это обязательное поле',
            })}
          />

          <Input
            type="text"
            label="Отчество (Не обязательно)"
            error={errors.ownerFatherName?.message}
            {...register('ownerFatherName')}
          />

          <Input
            type="number"
            label="ИНН (Не обязательно)"
            error={errors.ownerINN?.message}
            {...register('ownerINN')}
          />

          <Input
            type="email"
            label="Email (Не обязательно)"
            error={errors.ownerEmail?.message}
            {...register('ownerEmail')}
          />
          <Input
            type="tel"
            label="Телефон"
            error={errors.ownerPhone?.message}
            {...register('ownerPhone', {
              required: 'Это обязательное поле',
            })}
            onChange={handleMask}
            maxLength={12}
          />
        </section>
      </form>

      <aside className={styles.form__sidebar}>
        <nav>
          <ul className={styles.form__sidebar__nav}>
            <li
              className={`${styles.form__sidebar__item} ${activeSection === 'passport' ? styles['form__sidebar__item_active'] : ''}`}
            >
              <button
                className={styles.form__sidebar__button}
                onClick={() => scrollToSection('passport')}
                onKeyDown={(e) =>
                  e.key === 'Enter' && scrollToSection('passport')
                }
              >
                Паспорт животного
              </button>
            </li>
            <li
              className={`${styles.form__sidebar__item} ${activeSection === 'marking' ? styles['form__sidebar__item_active'] : ''}`}
            >
              <button
                className={styles.form__sidebar__button}
                onClick={() => scrollToSection('marking')}
                onKeyDown={(e) =>
                  e.key === 'Enter' && scrollToSection('marking')
                }
              >
                Маркировка
              </button>
            </li>
            <li
              className={`${styles.form__sidebar__item} ${activeSection === 'medical' ? styles['form__sidebar__item_active'] : ''}`}
            >
              <button
                className={styles.form__sidebar__button}
                onClick={() => scrollToSection('medical')}
                onKeyDown={(e) =>
                  e.key === 'Enter' && scrollToSection('medical')
                }
              >
                Медицинская карта
              </button>
            </li>
            <li
              className={`${styles.form__sidebar__item} ${activeSection === 'owner' ? styles['form__sidebar__item_active'] : ''}`}
            >
              <button
                className={styles.form__sidebar__button}
                onClick={() => scrollToSection('owner')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('owner')}
              >
                Владелец
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default NewPetForm;

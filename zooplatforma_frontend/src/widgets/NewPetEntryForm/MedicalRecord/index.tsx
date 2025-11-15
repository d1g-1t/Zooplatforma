import { VaccinationForm } from '../VaccinationForm';
import styles from '../style.module.scss';
import { PlusButton } from '../PlusButton';
import { PetVaccinationData } from '../types.ts';
import { VaccinationInput } from '../VaccinationInput';
import { useAppDispatch } from '../../../store/store.ts';
import { useState } from 'react';
import {
  VaccinationFormData,
  VaccinationType,
} from '../VaccinationForm/types.ts';
import { deleteVaccination } from '../../../store/reducers/animalSlice.ts';
import { VaccinationDataType } from '../VaccinationInput/types.ts';
interface MedicalRecordProps {
  data: VaccinationFormData;
  Vaccinations: VaccinationDataType[];
}

export const MedicalRecord = ({ data, Vaccinations }: MedicalRecordProps) => {
  const dispatch = useAppDispatch();
  const [isOpenVaccinationForm, setIsOpenVaccinationForm] = useState(false);
  const [isOpenDewormingForm, setIsOpenDewormingForm] = useState(false);
  return (
    <>
      {/*   <div className={styles.TitleSection}>
        <h3 className={styles.Title}>Медицинская карта</h3>
        <p className={styles.Hint}>Добавьте прививки и/или обработки питомца</p>
      </div> */}
      <ul className={styles.MarkingsVertical}>
        {Vaccinations &&
          Vaccinations.map((vac: PetVaccinationData, index: number) => (
            <li key={index} className={styles.MarkingsListItem}>
              <VaccinationInput
                type={vac.type}
                subject={vac.subject}
                date={vac.date}
                verified={vac.verified}
                onDeleteCallback={() => {
                  console.log(Vaccinations);
                  dispatch(deleteVaccination(vac.id));
                  // const animalProfileNew = useAppSelector((state) => state.animalSlice);
                  //отправить обновленный animalProfileNew на сервер
                  // или делать post запрос на обновление части информации
                }}
              />
            </li>
          ))}
      </ul>

      <ul className={styles.MarkingsVertical}>
        <li className={styles.MarkingsListItem}>
          <PlusButton
            openForm={isOpenVaccinationForm}
            text="Добавить прививку"
            onClick={() => {
              setIsOpenVaccinationForm(!isOpenVaccinationForm);
            }}
          />
          {isOpenVaccinationForm && (
            <VaccinationForm type={VaccinationType.Vaccination} data={data} />
          )}
        </li>
        <li className={styles.MarkingsListItem}>
          <PlusButton
            openForm={isOpenDewormingForm}
            text="Добавить обработку"
            onClick={() => {
              setIsOpenDewormingForm(!isOpenDewormingForm);
            }}
          />
          {isOpenDewormingForm && (
            <VaccinationForm type={VaccinationType.Deworming} data={data} />
          )}
        </li>
      </ul>
    </>
  );
};

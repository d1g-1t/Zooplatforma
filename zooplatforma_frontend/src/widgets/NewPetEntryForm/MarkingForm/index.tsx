import { useState } from 'react';
import { MarkingVerification } from '../MarkingVerification';
import styles from '../style.module.scss';
import Input from '../../../shared/ui/Input';
import { PlusButton } from '../PlusButton';
import { AnimalState } from '../../../store/reducers/animalSlice';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface MarkingFormProps {
  formStateMarking: {
    petChipValue: {
      value: string;
      verified: boolean;
    };
    petTagValue: {
      value: string;
      verified: boolean;
    };
    petBrandValue: {
      value: string;
      verified: boolean;
    };
  };
  errors: FieldErrors<AnimalState>;
  register: UseFormRegister<AnimalState>;
  inputColor?: string;
  isInputDisabled?: boolean;
}

export const MarkingForm = ({
  formStateMarking,
  errors,
  register,
  inputColor,
  isInputDisabled,
}: MarkingFormProps) => {
  const [isOpenChipValue, setIsOpenChipValue] = useState(false);
  const [isOpenTagValue, setIsOpenTagValue] = useState(false);
  const [isOpenBrandValue, setIsOpenBrandValue] = useState(false);
  return (
    <ul className={styles.MarkingsVertical}>
      <li className={styles.MarkingsListItem}>
        {formStateMarking.petChipValue.value || isOpenChipValue ? (
          <div className={styles.MarkingContainer}>
            <Input
              style={{ backgroundColor: inputColor }}
              disabled={isInputDisabled}
              type="text"
              label="Номер чипа"
              placeholder="Номер чипа"
              error={errors.petChipValue?.message}
              {...register('petChipValue.value')}
            />
            <MarkingVerification
              verified={formStateMarking.petChipValue.verified}
              className={styles.MarkingVerification}
              onClick={() => {}}
            />
          </div>
        ) : (
          <PlusButton
            text="Добавить чип"
            onClick={() => {
              setIsOpenChipValue((prevState) => !prevState);
            }}
          />
        )}
      </li>
      <li className={styles.MarkingsListItem}>
        {formStateMarking.petTagValue.value || isOpenTagValue ? (
          <div className={styles.MarkingContainer}>
            <Input
              style={{ backgroundColor: inputColor }}
              disabled={isInputDisabled}
              type="text"
              label="Номер бирки"
              placeholder="Номер бирки"
              error={errors.petTagValue?.message}
              {...register('petTagValue.value')}
            />
            <MarkingVerification
              verified={formStateMarking.petTagValue.verified}
              className={styles.MarkingVerification}
              onClick={() => {}}
            />
          </div>
        ) : (
          <PlusButton
            text="Добавить бирку"
            onClick={() => {
              setIsOpenTagValue((prevState) => !prevState);
            }}
          />
        )}
      </li>
      <li className={styles.MarkingsListItem}>
        {formStateMarking.petBrandValue.value || isOpenBrandValue ? (
          <div className={styles.MarkingContainer}>
            <Input
              style={{ backgroundColor: inputColor }}
              disabled={isInputDisabled}
              type="text"
              label="Номер клейма"
              placeholder="Номер клейма"
              error={errors.petBrandValue?.message}
              {...register('petBrandValue.value')}
            />
            <MarkingVerification
              verified={formStateMarking.petBrandValue.verified}
              className={styles.MarkingVerification}
              onClick={() => {}}
            />
          </div>
        ) : (
          <PlusButton
            text="Добавить клеймо"
            onClick={() => {
              setIsOpenBrandValue((prevState) => !prevState);
            }}
          />
        )}
      </li>
    </ul>
  );
};

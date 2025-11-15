export enum VaccinationType {
  Deworming,
  Vaccination,
}

export type VaccinationInputProps = {
  type: VaccinationType;
  subject: string;
  date: string;
  onEditCallback?: () => void;
  onDeleteCallback?: () => void;
  onVerificationButtonCallback?: () => void;
  verified: boolean;
};

export type VaccinationDataType = {
  id: string;
  type: VaccinationType;
  subject: string;
  date: string;
  verified: boolean;
};

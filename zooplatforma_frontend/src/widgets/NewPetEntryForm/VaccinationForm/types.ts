export type VaccinationFormData = {
  subject: string;
  subjectOptions: string[];
  date: string;
  vaccine: string;
  vaccineOptions: string[];
  createReminderIsSet: boolean;
  onCreateReminderChange: () => void;
  reminderFrequency?: ReminderFrequency | null;
  reminderFrequencyOptions: string[];
  reminderDate?: string;
};

export enum VaccinationType {
  Deworming = 'Обработка',
  Vaccination = 'Прививка',
}

// export enum VaccinationType {
//   Deworming,
//   Vaccination ,
// }

export enum ReminderFrequency {
  Once = 'Единоразово',
  Monthly = 'Каждый месяц',
  Yearly = 'Каждый год',
}

export type VaccinationFormProps = {
  type?: VaccinationType;
  onSubmit?: () => void;
  onAbort?: () => void;
  data?: VaccinationFormData;
  className?: string;
};

// export type VaccinationFormData = {
//   subject: string;
//   subjectOptions: string[];
//   date: string;
//   onDateChange: () => void;
//   dateError: string;
//   vaccine: string;
//   vaccineOptions: string[];
//   createReminderIsSet: boolean;
//   onCreateReminderChange: () => void;
//   reminderFrequency?: ReminderFrequency;
//   reminderFrequencyOptions?: ReminderFrequency[];
//   reminderDate?: string;
//   onReminderDateChange?: () => void;
//   reminderDateError?: string;
// };

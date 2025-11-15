export const ProfileAnimalMock = {
  animal: {
    id: '123Cat',
    petType: 'Кошка',
    petGender: 'Самец',
    petNameValue: 'Мурзик',
    petBreedValue: 'Дворняга',
    petColorValue: 'Белый',
    petBirthdateValue: '12.12.2024',
    petBirthdayIsApproximate: false,
    attachedPhoto: {
      name: '',
      url: 'https://funik.ru/wp-content/uploads/2018/12/75c255685547f880d166-700x607.jpeg',
    },
    petChipValue: {
      value: '123qw',
      verified: false,
    },
    petTagValue: {
      value: '234er',
      verified: false,
    },
    petBrandValue: {
      value: '',
      verified: false,
    },
    petVaccinationValue: [
      {
        id: '22',
        type: 0,
        subject: 'Блохи',
        date: '12.12.2000',
        verified: true,
      },
      {
        id: '224',
        type: 1,
        subject: 'Глисты',
        date: '12.12.2000',
        verified: true,
      },
    ],
    ownershipStatus: '',
  },
  subject: '',
  date: '',
  vaccine: '',
  createReminderIsSet: false,
  reminderFrequency: null,
  reminderDate: '',
  isLoading: false,
};

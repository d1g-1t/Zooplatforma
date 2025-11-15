import parsePhoneNumberFromString from 'libphonenumber-js';

export const normalizePhoneNumber = (value: string) => {
  const phoneNumber = parsePhoneNumberFromString(value, 'RU');
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatNational();
};

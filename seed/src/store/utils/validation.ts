import Moment from 'moment';
import { extendMoment } from 'moment-range';
// Field validation
import { getValidationInfo } from 'store/utils/errors';
import IBAN from 'iban';
import { combineSchedules } from './helper';

const moment = extendMoment(Moment);

const dateFormat = 'DD/MM/YYYY';

export const required = (value: string): string =>
  value !== undefined && value !== null
    ? false
    : getValidationInfo('required', 'this field is required');

export const isTrue = (value: string): string =>
  value !== undefined && value !== null && value
    ? false
    : getValidationInfo('required', 'this field is required');

export const checkbox = (value: string): string =>
  value ? false : getValidationInfo('required', 'this field is required');

export const maxLength = (max: number): string => (value: string): string =>
  value && value.length > max ? `Must be ${max} characters or less` : '';

export const minLength = (min: number, message: string): string => (value: string): string =>
  value && value.length < min
    ? message || getValidationInfo('atLeast', `Must be at least ${min}`, { min })
    : '';

export const number = (value: string): string =>
  value && isNaN(Number(value)) ? getValidationInfo('number', 'Must be a number') : '';

export const minValue = (min: number): string => (value: number): string =>
  value && value < min ? getValidationInfo('minValue', `Must be greater than ${min}`, { min }) : '';

export const maxValue = (max: number): string => (value: number): string =>
  value && value > max
    ? getValidationInfo('maxValue', `Must be less or equal to ${max}`, { max })
    : '';

export const minDate = date => value => {
  const min = moment(date);
  return moment(value).isBefore(date)
    ? getValidationInfo('minDate', `Date must be after ${min.format(dateFormat)}`, {
        min: min.format(dateFormat),
      })
    : '';
};

export const maxDate = date => value => {
  const max = moment(date);
  return moment(value).isAfter(date)
    ? getValidationInfo('minDate', `Date must be before ${max.format(dateFormat)}`, {
        min: max.format(dateFormat),
      })
    : '';
};

export const min0 = (value: number): string =>
  value && value <= 0 ? getValidationInfo('min0', 'Must be greater than 0') : '';

const emailRegex = new RegExp(
  "^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(.[a-zA-Z](-?[a-zA-Z0-9])*)+$",
);
export const email = (value): string =>
  value && !emailRegex.test(value) ? getValidationInfo('email', 'Email invalide') : false;

export const tooOld = (value: number): string =>
  value && value > 65 ? getValidationInfo('tooOld', 'You might be too old for this') : '';

export const aol = (value: string): string =>
  value && /.+@aol\.com/.test(value)
    ? getValidationInfo('aol', 'Really? You still use AOL for your email?')
    : '';
export const alphaNumeric = (value: string): string =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? getValidationInfo('alphaNumeric', 'Only alphanumeric characters')
    : '';

export const phoneNumber = (value: string): string =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? getValidationInfo('phoneNumber', 'Invalid phone number')
    : '';

export const compareTo = (field): string => (valueComparison: string): string => (
  value: string,
): string =>
  valueComparison !== value
    ? getValidationInfo('compareTo', `Does not match ${field}`, { field })
    : '';

export const comparePassword = compareTo('password');

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

// comparison between field 1 and field 2 (error on field 2)
export const fieldComparison = (options: {
  field1: string;
  field2: string;
  validationPath?: string;
  validationMessage?: string;
}) => values => {
  const errors = {};
  const first = values[options.field1 || 'password'];
  const second = values[options.field2 || 'confirmPassword'];
  if (first !== second) {
    errors[options.field2 || 'confirmPassword'] = getValidationInfo(
      options.validationPath,
      options.validationMessage || `Do not match with the ${options.field1 || 'password'} entered`,
      { field: options.field1 },
    );
  }

  return errors;
};

export const passwordValidation = (values: {}): string => {
  const errors = {};
  const first = values.password;
  const second = values.passwordConfirmation;
  if (first !== second) {
    errors.passwordConfirmation = getValidationInfo(
      'confirmPassword',
      'Do not match with the password entered',
    );
  }

  return errors;
};

export const scheduleOverlapValidation = value => {
  if (!value) return false;

  const errors = {};

  const daysKeys = Object.keys(value);

  for (let i = 0; i < daysKeys.length; i++) {
    const dayKey = daysKeys[i];
    const day = value[dayKey];

    const errorDay = errors[dayKey] || {};

    for (let j = 0; j < day.length; j++) {
      errorDay[j] = {};

      const slot1 = day[j];
      const from1 = moment(slot1[0], 'HH:mm');
      const to1 = moment(slot1[1], 'HH:mm');

      if (to1.isBefore(from1)) {
        errorDay[j].before = true;
        continue;
      }

      for (let k = 0; k < day.length; k++) {
        if (k === j) {
          continue;
        }
        const slot2 = day[k];

        const from2 = moment(slot2[0], 'HH:mm');
        const to2 = moment(slot2[1], 'HH:mm');
        if (to2.isBefore(from2)) {
          errorDay[j].before = true;
          continue;
        }
        if (moment.range(from1, to1).overlaps(moment.range(from2, to2))) {
          errorDay[j].overlap = true;
        }
      }
    }
    errors[dayKey] = errorDay;
  }

  return errors;
};

export const externalScheduleValidation = external => value => {
  if (!value) {
    return '';
  }

  return scheduleOverlapValidation(combineSchedules(value, external));
};

export const scheduleValidation = value => {
  const overlap = scheduleOverlapValidation(value);

  // check if overalp errors;
  let errorMessage = '';

  const keys = Object.keys(overlap);

  for (let i = 0; i < keys.length; i++) {
    const error = overlap[keys[i]];

    const errorKeys = Object.keys(error);

    for (let j = 0; j < errorKeys.length; j++) {
      const errorSlot = error[errorKeys[j]];
      if (errorSlot.before) {
        errorMessage = getValidationInfo(
          'scheduleBefore',
          'You entered a start time inferior to an end time',
        );
      }
      if (errorSlot.overlap) {
        errorMessage = getValidationInfo(
          'scheduleOverlap',
          'Careful some schedule slot are overlapping!',
        );
        break;
      }
    }
  }
  return errorMessage;
};

export const bankAccount = value => {
  return !IBAN.isValid(value)
    ? getValidationInfo('iban', 'The bank account you entered is not valid')
    : '';
};

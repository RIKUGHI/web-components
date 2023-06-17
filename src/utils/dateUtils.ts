import { DateRangeType, NullableDate } from '../components';

export const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa'];
export const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/**
 * Checks if a value is a nullable date.
 * @param {NullableDate} value - The value to check.
 * @return {boolean} Returns true if the value is null or an instance of Date, otherwise false.
 */
export function isNullableDate(value: NullableDate) {
  return value === null || value instanceof Date;
}

/**
 * Checks if a value is a valid date range.
 * @param {DateRangeType} value - The value to check.
 * @returns {boolean} Returns true if the value is a valid date range, otherwise false.
 */
export function isDateRange(value: DateRangeType) {
  return typeof value === 'object' && 'startDate' in value && isNullableDate(value.startDate) && 'endDate' in value && isNullableDate(value.endDate);
}

export function formatDateToYYYYMMDD(v: Date) {
  return v.getFullYear() + '-' + String(v.getMonth() + 1).padStart(2, '0') + '-' + String(v.getDate()).padStart(2, '0');
}

export function isSameDate(date1: Date, date2: Date) {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export function countDatesInRange(startDate: Date, endDate: Date) {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return Math.round(Math.abs((+endDate - +startDate) / (24 * 60 * 60 * 1000))) + 1;
}

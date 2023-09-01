import { h } from '@stencil/core';
import { NullableDate } from './single-date-picker/single-date-picker';
import { formatDateToYYYYMMDD } from '../../utils/dateUtils';

interface Props {
  date: NullableDate;
  placeholder?: string;
  displayFormat?: (d: Date) => string;
}

export default function previewDate({ date, placeholder = 'YYYY-MM-DD', displayFormat }: Props) {
  return <span class="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">{date ? (displayFormat ? displayFormat(date) : formatDateToYYYYMMDD(date)) : placeholder}</span>;
}

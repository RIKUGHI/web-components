import { h } from '@stencil/core';
import { NullableDate } from './single-date-picker/single-date-picker';
import { formatDateToYYYYMMDD } from '../../utils/dateUtils';

export default function previewDate({ date }: { date: NullableDate }) {
  return <span class="flex-1 rounded-md bg-gray-100 p-2 text-center md:flex-none">{date ? formatDateToYYYYMMDD(date) : 'YYYY-MM-DD'}</span>;
}

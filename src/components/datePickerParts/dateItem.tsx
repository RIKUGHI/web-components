import { h } from '@stencil/core';
import clsx from 'clsx';

type SelectedState = 'START' | 'SINGLE' | 'END' | undefined;
interface DateItem {
  date?: number;
  isToday?: boolean;
  isSun?: boolean;
  extendedDate?: boolean;
  disabled?: boolean;
  preSelected?: boolean;
  selectedType?: SelectedState;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export default function dateItem({ date, isToday, isSun, extendedDate, disabled, preSelected, selectedType, onClick, onMouseEnter }: DateItem) {
  return (
    <button
      class={clsx(
        'relative flex h-10 w-10 items-center justify-center font-semibold font-family text-xs',
        selectedType
          ? [
              'bg-green-600 text-white',
              (selectedType === 'START' || selectedType === 'END') && 'hover:rounded-lg',
              selectedType === 'START' && 'rounded-l-lg',
              selectedType === 'SINGLE' && 'rounded-lg',
              selectedType === 'END' && 'rounded-r-lg',
            ]
          : isToday || preSelected
          ? 'text-green-600'
          : extendedDate
          ? isSun
            ? 'text-red-300'
            : 'text-gray-300'
          : isSun && 'text-red-600',
        preSelected && 'bg-green-50',
        !extendedDate && !selectedType && !preSelected && !disabled && 'rounded-lg hover:bg-green-600 hover:text-white',
        extendedDate && !disabled && 'rounded-lg hover:bg-green-600/70 hover:text-white/70',
      )}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {disabled && <span class={clsx('absolute h-px w-1/3', extendedDate ? 'bg-gray-300' : 'bg-gray-900')}></span>}
      {date}
    </button>
  );
}

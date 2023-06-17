import { h } from '@stencil/core';
import clsx from 'clsx';

interface Props {
  label: string | number;
  isNavigator?: boolean;
  active?: boolean;
  isYearNegative?: boolean;
  onClick?: () => void;
}

export default function monthYearSwitcher({ label, isNavigator, active, isYearNegative, onClick }: Props) {
  return (
    <button
      tabIndex={-1}
      class={clsx(
        'w-full rounded-md py-2 text-center text-sm font-semibold font-family',
        isNavigator
          ? active
            ? 'bg-green-50 text-green-600'
            : 'hover:bg-green-50 hover:text-green-600'
          : isYearNegative
          ? 'text-gray-300 cursor-context-menu'
          : 'hover:bg-gray-50',
      )}
      onClick={onClick}
      disabled={isYearNegative}
    >
      {label}
    </button>
  );
}

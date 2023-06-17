import { h } from '@stencil/core';
import clsx from 'clsx';

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function dateRangeConfirmationButton({ label, disabled, onClick }: Props) {
  return (
    <button
      type="button"
      class={clsx('flex h-9 w-full items-center justify-center rounded-md px-3', label !== 'Cancel' && [disabled ? 'bg-gray-300 text-white' : 'bg-green-600 text-white'])}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

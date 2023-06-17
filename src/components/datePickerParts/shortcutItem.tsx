import { h } from '@stencil/core';

interface Props {
  label: string;
  onClick?: () => void;
}

export default function shortcutItem({ label, onClick }: Props) {
  return (
    <button class="w-full px-6 py-1.5 text-left leading-5 hover:bg-gray-50 hover:text-green-600" onClick={onClick}>
      {label}
    </button>
  );
}

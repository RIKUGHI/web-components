import { Component, Prop, h } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'month-year-switcher',
  styleUrl: 'month-year-switcher.css',
})
export class MonthYearSwitcher {
  @Prop() label: string | number;
  @Prop() isNavigator: boolean;
  @Prop() active: boolean;
  @Prop() isYearNegative: boolean;
  @Prop() onClick: () => void;

  render() {
    return (
      <button
        tabIndex={-1}
        class={clsx(
          'w-full rounded-md py-2 text-center text-sm font-semibold font-family',
          this.isNavigator ? (this.active ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 hover:text-green-600') : this.isYearNegative ? 'text-gray-300' : 'hover:bg-gray-50',
        )}
        onClick={this.onClick}
        disabled={this.isYearNegative}
      >
        {this.label}
      </button>
    );
  }
}

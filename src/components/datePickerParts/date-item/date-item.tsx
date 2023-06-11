import { Component, Host, Prop, h } from '@stencil/core';
import clsx from 'clsx';

export type SelectedState = 'START' | 'SINGLE' | 'END' | undefined;

@Component({
  tag: 'date-item',
  styleUrl: 'date-item.css',
})
export class DateItem {
  @Prop() date: number;
  @Prop() isToday: boolean;
  @Prop() isSun: boolean;
  @Prop() extendedDate: boolean;
  @Prop() disabled: boolean;
  @Prop() preSelected: boolean;
  @Prop() selectedType: SelectedState;
  @Prop() onClick: () => void;
  @Prop() onMouseEnter: () => void;

  render() {
    return (
      <Host>
        <button
          class={clsx(
            'relative flex h-10 w-10 items-center justify-center font-semibold font-family',
            this.selectedType
              ? [
                  'bg-green-600 text-white',
                  (this.selectedType === 'START' || this.selectedType === 'END') && 'hover:rounded-lg',
                  this.selectedType === 'START' && 'rounded-l-lg',
                  this.selectedType === 'SINGLE' && 'rounded-lg',
                  this.selectedType === 'END' && 'rounded-r-lg',
                ]
              : this.isToday || this.preSelected
              ? 'text-green-600'
              : this.extendedDate
              ? this.isSun
                ? 'text-red-300'
                : 'text-gray-300'
              : this.isSun && 'text-red-600',
            this.preSelected && 'bg-green-50',
            !this.extendedDate && !this.selectedType && !this.preSelected && !this.disabled && 'rounded-lg hover:bg-green-600 hover:text-white',
            this.extendedDate && !this.disabled && 'rounded-lg hover:bg-green-600/70 hover:text-white/70',
          )}
          disabled={this.disabled}
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
        >
          {this.disabled && <span class={clsx('absolute h-px w-1/3', this.extendedDate ? 'bg-gray-300' : 'bg-gray-900')}></span>}
          {this.date}
        </button>
      </Host>
    );
  }
}

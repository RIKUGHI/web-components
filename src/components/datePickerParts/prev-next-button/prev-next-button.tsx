import { Component, Host, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'prev-next-button',
  styleUrl: 'prev-next-button.css',
  // shadow: true,
})
export class PrevNextButton {
  @Prop() direction: 'prev' | 'next';
  @Prop() isYearNegative: boolean;
  @Prop() onClick: () => void;

  render() {
    return (
      <button tabIndex={-1} class={clsx('flex items-center justify-center rounded-full p-2', this.isYearNegative ? 'text-gray-300' : 'hover:bg-gray-50')} onClick={this.onClick}>
        {this.direction == 'prev' ? (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-xs" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
          </svg>
        ) : (
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="text-xs" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
          </svg>
        )}
      </button>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'month-year-switcher',
  styleUrl: 'month-year-switcher.css',
  shadow: true,
})
export class MonthYearSwitcher {
  @Prop() label: string;
  @Prop() isNavigator: boolean;

  render() {
    return (
      <Host>
        <button tabIndex={-1}>{this.label}</button>
      </Host>
    );
  }
}

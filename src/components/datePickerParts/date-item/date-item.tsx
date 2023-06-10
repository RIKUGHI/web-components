import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'date-item',
  styleUrl: 'date-item.css',
  shadow: true,
})
export class DateItem {
  @Prop() date: number;

  render() {
    return (
      <Host>
        <button>{this.date}</button>
      </Host>
    );
  }
}

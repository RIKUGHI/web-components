import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  @Prop() id: string;
  @Prop() defaultValue: Date;

  @State() date: Date = new Date();
  @State() currentMonth: number = this.date.getMonth();
  @State() currentYear: number = this.date.getFullYear();

  connectedCallback() {
    const inputEl = document.getElementById(this.id);
    inputEl.onfocus = () => {
      console.log('hi');
    };
    inputEl.onblur = () => {
      console.log('exit');
    };
  }

  render() {
    return (
      <Host>
        <single-date-picker id="datePicker1" currentMonth={this.currentMonth} currentYear={this.currentYear} />
      </Host>
    );
  }
}

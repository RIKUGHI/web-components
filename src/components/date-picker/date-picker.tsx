import { Component, Host, Prop, State, h, Element } from '@stencil/core';

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

  @Element() el: HTMLElement;

  connectedCallback() {
    // const inputEl = document.getElementById(this.id);
    // inputEl.onfocus = () => {
    //   console.log('hi');
    // };
    // inputEl.onblur = () => {
    //   console.log('exit');
    // };
    // setTimeout(() => {
    //   this.currentMonth = 10;
    // }, 1000);
  }

  handleSetCurrentMonth(month: number) {
    this.currentMonth = month;
  }

  handleSetCurrentYear(year: number) {
    this.currentYear = year;
  }

  render() {
    return (
      // <Host style={{ '--green-600': 'red' }}>
      // <Host
      //   class={{
      //     'top-to-bottom': true,
      //     // 'bottom-to-top': true,
      //   }}
      // >
      // </Host>
      <div class="absolute z-10 flex flex-col rounded-md border border-gray-300 bg-white top-to-bottom">
        <single-date-picker
          picker_id="datePicker1"
          currentMonth={this.currentMonth}
          currentYear={this.currentYear}
          setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
          setCurrentYear={this.handleSetCurrentYear.bind(this)}
        />
      </div>
    );
  }
}

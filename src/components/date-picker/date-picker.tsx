import { Component, Host, Prop, State, h, Element } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  @Prop() target: string;
  @Prop() defaultValue: Date;

  @State() inputEl: null | HTMLInputElement = null;

  @State() openDatePicker: boolean = false;

  @State() date: Date = new Date();
  @State() currentMonth: number = this.date.getMonth();
  @State() currentYear: number = this.date.getFullYear();

  @Element() hostEl: HTMLElement;

  datePickerContainerRef!: HTMLDivElement;

  connectedCallback() {
    const inputEl = document.getElementById(this.target);

    if (inputEl && inputEl.tagName === 'INPUT') {
      this.inputEl = inputEl as HTMLInputElement;
      this.inputEl.onfocus = this.handleFocus.bind(this);
      this.inputEl.onblur = this.handleBlur.bind(this);
    }
  }

  // componentDidLoad() {
  //   console.log(this.hostEl.getBoundingClientRect());
  // }

  private handleFocus() {
    this.openDatePicker = true;

    // auto directions
    this.datePickerContainerRef.classList.replace('hidden', 'flex');
    this.datePickerContainerRef.classList.add(this.datePickerContainerRef.getBoundingClientRect().bottom + 10 > window.innerHeight ? 'bottom-to-top' : 'top-to-bottom');

    window.onmousedown = e => {
      const isClickedInsideDatePickerContainer = this.hostEl.contains(e.target as Node);

      if (isClickedInsideDatePickerContainer) e.preventDefault();
    };
  }

  private handleBlur() {
    this.openDatePicker = false;
    this.datePickerContainerRef.classList.replace('flex', 'hidden');
    this.datePickerContainerRef.classList.remove('top-to-bottom');
    this.datePickerContainerRef.classList.remove('bottom-to-top');
    window.onmousedown = null;
  }

  private handleSetCurrentMonth(month: number) {
    this.currentMonth = month;
  }

  private handleSetCurrentYear(year: number) {
    this.currentYear = year;
  }

  private handleSetSelected(d: Date) {
    // if (!selected || (selected && !isSameDate(selected, d))) {
    //   setSelected(d)
    //   if (onChange) onChange(d)
    // }
    // inputRef.current?.blur()
  }

  render() {
    return (
      // <Host style={{ '--green-600': 'red' }}>
      <Host
        class={
          {
            // 'top-to-bottom': true,
            // 'bottom-to-top': true,
          }
        }
      >
        <div ref={el => (this.datePickerContainerRef = el as HTMLDivElement)} class="hidden absolute z-10 flex-col rounded-md border border-gray-300 bg-white">
          <single-date-picker
            picker_id="datePicker1"
            currentMonth={this.currentMonth}
            currentYear={this.currentYear}
            setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
            setCurrentYear={this.handleSetCurrentYear.bind(this)}
            setSelected={this.handleSetSelected.bind(this)}
          />
        </div>
      </Host>
    );
  }
}

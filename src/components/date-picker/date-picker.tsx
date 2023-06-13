import { Component, Host, Prop, State, h, Element, Watch } from '@stencil/core';
import clsx from 'clsx';
import { formatDateToYYYYMMDD, isSameDate } from '../../utils/dateUtils';
import { NullableDate } from '../datePickerParts/single-date-picker/single-date-picker';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  @Prop() target: string;
  // @Prop() defaultValue: Date;
  @Prop() defaultStyle: string;
  // @Prop() defaultStyle: { [key: string]: string };
  @State() inputEl: null | HTMLInputElement = null;

  @State() openDatePicker: boolean = false;
  @State() selected: NullableDate = null;

  @State() date: Date = new Date();
  @State() currentMonth: number = this.date.getMonth();
  @State() currentYear: number = this.date.getFullYear();

  // @State() innerDefaultStyle: { [key: string]: string };

  @Element() hostEl: HTMLElement;

  datePickerContainerRef!: HTMLDivElement;

  connectedCallback() {
    console.log(this.defaultStyle);
    console.log(JSON.parse(this.defaultStyle));
    // console.log(JSON.parse('{"--green-600": "orange"}'));

    const inputEl = document.getElementById(this.target);

    if (inputEl && inputEl.tagName === 'INPUT') {
      this.inputEl = inputEl as HTMLInputElement;
      this.inputEl.onfocus = this.handleFocus.bind(this);
      this.inputEl.onblur = this.handleBlur.bind(this);
    }
  }

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
    if (!this.selected || (this.selected && !isSameDate(this.selected, d))) {
      this.inputEl.value = formatDateToYYYYMMDD(d);
      this.selected = d;
      // if (onChange) onChange(d)
    }
    this.inputEl.blur();
  }

  render() {
    return (
      // <Host style={{ '--green-600': 'red' }}>
      <Host
        // style={{
        //   '--green-600': 'orange',
        //   '--red-600': 'blue',
        // }}
        style={JSON.parse(this.defaultStyle)}
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
            selected={this.selected}
            setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
            setCurrentYear={this.handleSetCurrentYear.bind(this)}
            setSelected={this.handleSetSelected.bind(this)}
          />
        </div>
      </Host>
    );
  }
}

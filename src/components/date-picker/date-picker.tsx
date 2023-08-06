import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { formatDateToYYYYMMDD, isSameDate } from '../../utils/dateUtils';
import { NullableDate } from '../datePickerParts/single-date-picker/single-date-picker';

@Component({
  tag: 'date-picker',
  styleUrl: 'date-picker.css',
  shadow: true,
})
export class DatePicker {
  @Prop() target: string;
  /**
   * YYYY-MM-DD
   */
  @Prop() defaultValue: string | Date;
  @Prop() defaultStyle: string;
  @Prop() minDate: Date;
  @Prop() maxDate: Date;
  @Prop() displayFormat: (d: Date) => string;
  @Prop() valueChanged: undefined | ((v: string) => string);
  @State() inputEl: null | HTMLInputElement = null;

  @State() selected: NullableDate = null;

  @State() date: Date = new Date();
  @State() currentMonth: number = this.date.getMonth();
  @State() currentYear: number = this.date.getFullYear();

  @State() open: boolean = false;

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

  componentShouldUpdate(newValue, oldValue, propName) {
    if (propName === 'defaultValue') {
      this.handleSetSelectedWithPreview(newValue);
    }

    if (oldValue) {
    }
  }

  componentWillLoad() {
    this.handleSetSelectedWithPreview(this.defaultValue);
  }

  private handleFocus() {
    this.open = true;

    this.adjustDatePicker();

    // auto directions
    setTimeout(() => {
      this.datePickerContainerRef.classList.replace('hidden', 'flex');
      if (this.datePickerContainerRef.getBoundingClientRect().bottom + 10 > window.innerHeight) {
        this.datePickerContainerRef.classList.add('bottom-to-top');
        this.hostEl.classList.add('bottom-to-top');
      } else {
        this.datePickerContainerRef.classList.add('top-to-bottom');
        this.hostEl.classList.remove('bottom-to-top');
      }
    }, 50);

    window.onmousedown = e => {
      const isClickedInsideDatePickerContainer = this.hostEl.contains(e.target as Node);

      if (isClickedInsideDatePickerContainer) e.preventDefault();
    };
  }

  private handleBlur() {
    this.open = false;
    this.datePickerContainerRef.classList.replace('flex', 'hidden');
    this.datePickerContainerRef.classList.remove('top-to-bottom');
    this.datePickerContainerRef.classList.remove('bottom-to-top');
    window.onmousedown = null;
  }

  private handleSetSelectedWithPreview(v: string | null | Date) {
    if (v === null) {
      this.selected = null;
      this.inputEl.value = '';
      return;
    }

    const defaultValue = new Date(v);

    if (isNaN(defaultValue.getDate())) return;

    defaultValue.setHours(0, 0, 0, 0);
    this.selected = defaultValue;

    this.inputEl.value = formatDateToYYYYMMDD(defaultValue);
  }

  private adjustDatePicker() {
    if (this.selected instanceof Date) {
      this.date = this.selected;
      this.currentMonth = this.date.getMonth();
      this.currentYear = this.date.getFullYear();
    }
  }

  private handleSetCurrentMonth(month: number) {
    this.currentMonth = month;
  }

  private handleSetCurrentYear(year: number) {
    this.currentYear = year;
  }

  private handleSetSelected(d: Date) {
    if (!this.selected || (this.selected && !isSameDate(this.selected, d))) {
      this.inputEl.value = this.displayFormat ? this.displayFormat(d) : formatDateToYYYYMMDD(d);
      this.selected = d;
      if (this.valueChanged) this.valueChanged(this.inputEl.value);
    }
    this.inputEl.blur();
  }

  render() {
    return (
      <Host style={this.defaultStyle ? JSON.parse(this.defaultStyle) : undefined}>
        <div ref={el => (this.datePickerContainerRef = el as HTMLDivElement)} class="hidden absolute z-10 flex-col rounded-md border border-gray-300 bg-white">
          {this.open && (
            <single-date-picker
              picker_id="datePicker1"
              currentMonth={this.currentMonth}
              currentYear={this.currentYear}
              selected={this.selected}
              minDate={this.minDate}
              maxDate={this.maxDate}
              setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
              setCurrentYear={this.handleSetCurrentYear.bind(this)}
              setSelected={this.handleSetSelected.bind(this)}
            />
          )}
        </div>
      </Host>
    );
  }
}

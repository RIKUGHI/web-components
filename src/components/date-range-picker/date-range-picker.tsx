import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import shortcutItem from '../datePickerParts/shortcutItem';
import { countDatesInRange, formatDateToYYYYMMDD, isDateRange } from '../../utils/dateUtils';
import previewDate from '../datePickerParts/previewDate';
import dateRangeConfirmationButton from '../datePickerParts/dateRangeConfirmationButton';
import { DateRangeType, IdDatePickerState } from '../datePickerParts/single-date-picker/single-date-picker';

export type ShortcutType = {
  label: string;
  range: DateRangeType;
};

@Component({
  tag: 'date-range-picker',
  styleUrl: 'date-range-picker.css',
  shadow: true,
})
export class DateRangePicker {
  @Prop() target: string;

  @Prop() defaultValue: DateRangeType;
  @Prop() defaultStyle: string;
  @Prop() minDate: Date;
  @Prop() maxDate: Date;
  @Prop() displayFormat: (d: Date) => string;
  @Prop() placeholder: string;
  @Prop() separator: string;
  @Prop() shortcutList: boolean | ShortcutType[];
  @Prop() useConfirmation: boolean = false;
  @State() inputEl: null | HTMLInputElement = null;

  @State() datePickerClickCount: number = 1;
  @State() directionSelectedRange: 'STE' | 'ETS' = 'STE';
  @State() hasMouseEnteredDate: boolean = false;

  @State() selected: DateRangeType = { startDate: null, endDate: null };

  @State() date1: Date = new Date();
  @State() currentMonth1: number = this.date1.getMonth();
  @State() currentYear1: number = this.date1.getFullYear();

  @State() date2: Date = this.getAdjustedDatePicker2Value(this.selected);
  @State() currentMonth2: number = this.date2.getMonth();
  @State() currentYear2: number = this.date2.getFullYear();

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

  componentWillLoad() {
    if (this.defaultValue === null || (this.defaultValue && !isDateRange(this.defaultValue))) {
      throw new Error('The value structure must be of type DateRangeType');
    } else {
      this.selected = this.defaultValue ? this.sortAndResetDateRange(this.defaultValue) : { startDate: null, endDate: null };
      this.inputEl.value = formatDateToYYYYMMDD(this.selected.startDate) + ' ~ ' + formatDateToYYYYMMDD(this.selected.endDate);
    }
  }

  private handleFocus() {
    this.open = true;
    this.datePickerContainerRef.classList.replace('hidden', 'flex');

    this.adjustDateRangePicker(this.selected);

    window.onmousedown = e => {
      const isClickedInsideDatePickerContainer = this.hostEl.contains(e.target as Node);

      if (isClickedInsideDatePickerContainer) e.preventDefault();
    };
  }

  private handleBlur() {
    this.open = false;
    this.datePickerContainerRef.classList.replace('flex', 'hidden');

    window.onmousedown = null;
  }

  private handleSetCurrentMonth(month: number, year: number, idComp: IdDatePickerState) {
    if (idComp === 'datePicker1') {
      this.currentMonth1 = month;

      if (new Date(year, month) >= new Date(this.currentYear2, this.currentMonth2)) this.adjustDatePicker2(new Date(year, month + 1));
    }

    if (idComp === 'datePicker2') {
      this.currentMonth2 = month;

      if (new Date(year, month) <= new Date(this.currentYear1, this.currentMonth1)) this.adjustDatePicker1(new Date(year, month - 1));
    }
  }

  private handleSetCurrentYear(year: number, month: number, idComp: IdDatePickerState) {
    if (idComp === 'datePicker1') {
      this.currentYear1 = year;

      if (new Date(year, month) >= new Date(this.currentYear2, this.currentMonth2)) this.adjustDatePicker2(new Date(year, month + 1));
    }

    if (idComp === 'datePicker2') {
      this.currentYear2 = year;

      if (new Date(year, month) <= new Date(this.currentYear1, this.currentMonth1)) this.adjustDatePicker1(new Date(year, month - 1));
    }
  }

  private adjustDateRangePicker(d: DateRangeType) {
    const adjustDate1 = d.startDate ?? new Date();
    this.adjustDatePicker1(adjustDate1);
    this.adjustDatePicker2(this.getAdjustedDatePicker2Value(d));
  }

  private getAdjustedDatePicker2Value(d: DateRangeType) {
    const adjustDate = d.startDate ?? new Date();

    return !d.endDate || (adjustDate.getMonth() === d.endDate.getMonth() && adjustDate.getFullYear() === d.endDate.getFullYear())
      ? new Date(adjustDate.getFullYear(), adjustDate.getMonth() + 1)
      : d.endDate;
  }

  private adjustDatePicker1(d: Date): void {
    this.date1 = d;
    this.currentMonth1 = d.getMonth();
    this.currentYear1 = d.getFullYear();
  }

  private adjustDatePicker2(d: Date): void {
    this.date2 = d;
    this.currentMonth2 = d.getMonth();
    this.currentYear2 = d.getFullYear();
  }

  private handleSetSelected(d: Date) {
    let newDateRange: DateRangeType = {
      startDate: this.datePickerClickCount === 1 ? d : this.selected.startDate,
      endDate: this.datePickerClickCount === 2 ? d : null,
    };

    if (this.datePickerClickCount === 2) {
      newDateRange = this.sortAndResetDateRange(newDateRange);

      if (!this.useConfirmation) this.inputEl.blur();
    }

    if (!this.hasMouseEnteredDate) this.selected = newDateRange;

    if (!this.useConfirmation) {
      this.inputEl.value = this.displayDateRange(this.hasMouseEnteredDate ? this.selected : newDateRange);
    }

    if (this.datePickerClickCount === 2) {
      this.datePickerClickCount = 1;
      this.directionSelectedRange = 'STE';
      this.hasMouseEnteredDate = false;
    } else this.datePickerClickCount = 2;
  }

  private handleMouseEnterDate(d: Date) {
    if (this.datePickerClickCount === 2) {
      let newDateRange: DateRangeType | null = null;

      if (this.directionSelectedRange === 'STE' && this.selected.startDate) {
        if (d < this.selected.startDate) {
          newDateRange = {
            startDate: d,
            endDate: this.selected.startDate,
          };
          this.directionSelectedRange = 'ETS';
        } else {
          newDateRange = {
            startDate: this.selected.startDate,
            endDate: d,
          };
        }
      } else {
        if (this.directionSelectedRange === 'ETS' && this.selected.endDate) {
          if (d > this.selected.endDate) {
            newDateRange = {
              startDate: this.selected.endDate,
              endDate: d,
            };
            this.directionSelectedRange = 'STE';
          } else {
            newDateRange = {
              startDate: d,
              endDate: this.selected.endDate,
            };
          }
        }
      }

      if (newDateRange) this.selected = newDateRange;
      this.hasMouseEnteredDate = true;
    }
  }

  private handleCancel() {
    this.inputEl.blur();
  }

  private handleApply() {
    this.inputEl.value = this.displayDateRange(this.selected);
    this.inputEl.blur();
  }

  private handleShortCut(d: DateRangeType) {
    if (d === null || !isDateRange(d)) throw new Error('The value structure must be of type DateRangeType');

    const sortedDateRange = this.sortAndResetDateRange(d);

    this.selected = sortedDateRange;
    this.adjustDateRangePicker(sortedDateRange);

    if (!this.useConfirmation) {
      this.inputEl.value = this.displayDateRange(sortedDateRange);
      this.inputEl.blur();
    }
  }

  private sortAndResetDateRange({ startDate, endDate }: DateRangeType): DateRangeType {
    if (startDate) startDate.setHours(0, 0, 0, 0);
    if (endDate) endDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      if (!startDate && endDate)
        return {
          startDate: endDate,
          endDate: null,
        };

      return { startDate, endDate };
    }

    if (startDate > endDate) [startDate, endDate] = [endDate, startDate];

    return { startDate, endDate };
  }

  private displayDateRange(d: DateRangeType): string {
    let mergedValue = [];

    for (const key in d) {
      const dateValue = d[key as keyof DateRangeType];

      if (dateValue) mergedValue.push(this.displayFormat ? this.displayFormat(dateValue) : formatDateToYYYYMMDD(dateValue));
    }

    return mergedValue.join(this.separator ?? ' ~ ');
  }

  render() {
    const defaultShortcutList: ShortcutType[] = [
      {
        label: 'Today',
        range: {
          startDate: new Date(),
          endDate: new Date(),
        },
      },
    ];

    if (typeof this.shortcutList === 'object' && this.shortcutList.length > 0) defaultShortcutList.push(...this.shortcutList);

    return (
      <Host style={this.defaultStyle ? JSON.parse(this.defaultStyle) : undefined}>
        <div
          ref={el => (this.datePickerContainerRef = el as HTMLDivElement)}
          class="hidden top-to-bottom absolute z-10 flex-col rounded-md border border-gray-300 bg-white md:flex-row"
        >
          {this.open && this.shortcutList && (
            <div class="hidden w-full border-b border-gray-300 py-4 sm:block md:w-36 md:border-r md:py-6">
              <ul class="grid grid-cols-2 text-xs md:grid-cols-1">
                {defaultShortcutList.map(shortcut => (
                  <li class="rounded-md">{shortcutItem({ label: shortcut.label, onClick: () => this.handleShortCut(shortcut.range) })}</li>
                ))}
              </ul>
            </div>
          )}

          {this.open && (
            <div class="flex flex-col">
              <div class="flex flex-col sm:flex-row">
                <single-date-picker
                  picker_id="datePicker1"
                  currentMonth={this.currentMonth1}
                  currentYear={this.currentYear1}
                  selected={this.selected}
                  minDate={this.minDate}
                  maxDate={this.maxDate}
                  setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
                  setCurrentYear={this.handleSetCurrentYear.bind(this)}
                  setSelected={this.handleSetSelected.bind(this)}
                  setMouseEnterDate={this.handleMouseEnterDate.bind(this)}
                />
                <div class="border-r border-gray-300"></div>
                <single-date-picker
                  picker_id="datePicker2"
                  currentMonth={this.currentMonth2}
                  currentYear={this.currentYear2}
                  selected={this.selected}
                  minDate={this.minDate}
                  maxDate={this.maxDate}
                  setCurrentMonth={this.handleSetCurrentMonth.bind(this)}
                  setCurrentYear={this.handleSetCurrentYear.bind(this)}
                  setSelected={this.handleSetSelected.bind(this)}
                  setMouseEnterDate={this.handleMouseEnterDate.bind(this)}
                />
              </div>
              {this.useConfirmation && (
                <div class="flex flex-col justify-between space-y-4 border-t border-gray-300 px-6 py-4 md:flex-row md:space-y-0">
                  <div class="flex items-center space-x-5">
                    <div class="flex w-full items-center space-x-2 text-sm font-semibold md:w-auto">
                      {previewDate({ date: this.selected.startDate, placeholder: this.placeholder, displayFormat: this.displayFormat })}
                      <span class="mt-0.5 h-0.5 w-3 bg-gray-400"></span>
                      {previewDate({ date: this.selected.endDate, placeholder: this.placeholder, displayFormat: this.displayFormat })}
                    </div>
                    {this.selected.startDate && this.selected.endDate && (
                      <span class="hidden text-sm font-semibold md:block">
                        {countDatesInRange(this.selected.startDate, this.selected.endDate)} {countDatesInRange(this.selected.startDate, this.selected.endDate) > 1 ? 'days' : 'day'}{' '}
                        <span class="text-gray-400">selected</span>
                      </span>
                    )}
                  </div>

                  <div class="flex space-x-2">
                    {dateRangeConfirmationButton({ label: 'Cancel', onClick: this.handleCancel.bind(this) })}
                    {dateRangeConfirmationButton({ label: 'Apply', disabled: !this.selected.startDate || !this.selected.endDate, onClick: this.handleApply.bind(this) })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}

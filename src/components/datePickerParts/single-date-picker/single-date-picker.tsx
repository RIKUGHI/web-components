import { Component, Host, Prop, State, h, Fragment, Watch } from '@stencil/core';
import { days, months } from '../../../utils/dateUtils';
import clsx from 'clsx';
import dateItem from '../dateItem';

export type IdDatePickerState = 'datePicker1' | 'datePicker2';
export type DatePickerNavigationType = 'PREV' | 'NEXT';
type TabState = 'MONTH' | 'YEAR' | null;

// export type SelectedState = 'START' | 'SINGLE' | 'END' | undefined;
// interface DateItem {
//   date?: number;
//   isToday?: boolean;
//   isSun?: boolean;
//   extendedDate?: boolean;
//   disabled?: boolean;
//   preSelected?: boolean;
//   selectedType?: SelectedState;
//   onClick?: () => void;
//   onMouseEnter?: () => void;
// }

@Component({
  tag: 'single-date-picker',
  styleUrl: 'single-date-picker.css',
})
export class SingleDatePicker {
  @Prop() picker_id!: IdDatePickerState;
  @Prop() currentMonth!: number;
  @Prop() currentYear!: number;
  @Prop() setCurrentMonth!: (month: number, year: number, idComp: IdDatePickerState) => void;
  @Prop() setCurrentYear!: (year: number, month: number, idComp: IdDatePickerState) => void;

  @State() activeTab: TabState = null;
  @State() numberofYearsShown: number = 12;
  @State() stackedYearIntervals: number = 0;

  @State() lastDateofMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

  @State() firstDayofMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  @State() lastDayofMonth = new Date(this.currentYear, this.currentMonth, this.lastDateofMonth).getDay();

  @State() lostMonth = new Date(this.currentYear, this.currentMonth, 0);
  @State() lostMonthIndex = this.lostMonth.getMonth();
  @State() lastDateofLostMonth = this.lostMonth.getDate();

  @Watch('currentMonth')
  watchPropCurrentMonth(newValue: number, oldValue: number) {
    this.lastDateofMonth = new Date(this.currentYear, newValue + 1, 0).getDate();

    this.firstDayofMonth = new Date(this.currentYear, newValue, 1).getDay();
    this.lastDayofMonth = new Date(this.currentYear, newValue, this.lastDateofMonth).getDay();

    this.lostMonth = new Date(this.currentYear, newValue, 0);
    this.lostMonthIndex = this.lostMonth.getMonth();
    this.lastDateofLostMonth = this.lostMonth.getDate();
  }

  @Watch('currentYear')
  watchPropCurrentYear(newValue: number, oldValue: number) {
    this.lastDateofMonth = new Date(newValue, this.currentMonth + 1, 0).getDate();

    this.firstDayofMonth = new Date(newValue, this.currentMonth, 1).getDay();
    this.lastDayofMonth = new Date(newValue, this.currentMonth, this.lastDateofMonth).getDay();

    this.lostMonth = new Date(newValue, this.currentMonth, 0);
    this.lostMonthIndex = this.lostMonth.getMonth();
    this.lastDateofLostMonth = this.lostMonth.getDate();
  }

  private handleToggleTab(v: TabState) {
    // reset stacked year intervals to 0
    if (v === 'YEAR') this.stackedYearIntervals = 0;

    this.activeTab = this.activeTab === v ? null : v;
  }

  private handlePrevNext(type: DatePickerNavigationType, cb?: (year: number, month: number) => void) {
    if (!this.activeTab) {
      const newCurrentMonth = this.currentMonth + (type === 'PREV' ? -1 : 1);

      if (newCurrentMonth < 0 || newCurrentMonth > 11) {
        const newDate = new Date(this.currentYear, newCurrentMonth, new Date().getDate());

        this.setCurrentMonth(newDate.getMonth(), newDate.getFullYear(), this.picker_id);
        this.setCurrentYear(newDate.getFullYear(), newDate.getMonth(), this.picker_id);

        if (cb) cb(newDate.getFullYear(), newDate.getMonth());
      } else {
        this.setCurrentMonth(newCurrentMonth, this.currentYear, this.picker_id);

        if (cb) cb(this.currentYear, newCurrentMonth);
      }
    }

    if (this.activeTab === 'YEAR') {
      this.stackedYearIntervals = this.stackedYearIntervals + (type === 'PREV' ? -this.numberofYearsShown : this.numberofYearsShown);
    }
  }

  private handleActiveMonth(month: number) {
    this.setCurrentMonth(month, this.currentYear, this.picker_id);
    this.activeTab = null;
  }

  private handleActiveYear(year: number) {
    this.setCurrentYear(year, this.currentMonth, this.picker_id);
    this.activeTab = null;
  }

  private getLastDatesOfLostMonth() {
    const el: Element[] = [];

    for (let i = this.firstDayofMonth; i > 0; i--) {
      let lostDate = this.lastDateofLostMonth - i + 1;
      let day = new Date(this.currentYear, this.lostMonthIndex, lostDate).getDay();

      let isSun = day === 0;
      const mergedDate = new Date(this.currentYear, this.currentMonth - 1, lostDate);

      el.push(dateItem({ date: lostDate, isSun, extendedDate: true }));
    }

    return el;
  }

  private getDatesOfMonth() {
    const el: Element[] = [];

    for (let i = 1; i <= this.lastDateofMonth; i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      let day = date.getDay();

      let isSun = day === 0;
      let isToday = i === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear();

      el.push(dateItem({ date: i, isToday, isSun }));
    }

    return el;
  }

  private getFirstDatesOfNextMonth() {
    const el: Element[] = [];

    for (let i = this.lastDayofMonth; i < 6; i++) {
      const date = i - this.lastDayofMonth + 1;
      const mergedDate = new Date(this.currentYear, this.currentMonth + 1, date);

      el.push(dateItem({ date, extendedDate: true }));
    }

    return el;
  }

  render() {
    // console.log(this.currentMonth, this.lastDateofMonth);

    return (
      <div class="flex flex-col p-5">
        <div class="flex items-center justify-between gap-2 rounded-md border border-gray-300 px-2 py-1.5">
          {this.activeTab !== 'MONTH' && (
            <prev-next-button
              direction="prev"
              isYearNegative={this.activeTab === 'YEAR' && this.currentYear + this.stackedYearIntervals < 0}
              onClick={() => this.handlePrevNext('PREV')}
            />
          )}

          <month-year-switcher label={months[this.currentMonth]} isNavigator active={this.activeTab === 'MONTH'} onClick={() => this.handleToggleTab('MONTH')} />
          <month-year-switcher label={this.currentYear} isNavigator active={this.activeTab === 'YEAR'} onClick={() => this.handleToggleTab('YEAR')} />

          {this.activeTab !== 'MONTH' && <prev-next-button direction="next" onClick={() => this.handlePrevNext('NEXT')} />}
        </div>

        <div class={clsx('grid w-7-cols text-center text-gray-900', this.activeTab === 'MONTH' || this.activeTab === 'YEAR' ? 'mt-3 grid-cols-2 gap-2' : 'grid-cols-7')}>
          {this.activeTab === 'MONTH' && months.map((month, i) => <month-year-switcher key={i} label={month} onClick={() => this.handleActiveMonth(i)} />)}

          {this.activeTab === 'YEAR' &&
            Array.from({ length: this.numberofYearsShown }).map((_, i) => {
              const year = this.currentYear + i + this.stackedYearIntervals;
              const isYearNegative = year < 0;

              return <month-year-switcher key={i} label={year} isYearNegative={year < 0} onClick={() => this.handleActiveYear(year)} />;
            })}

          {!this.activeTab && (
            <Fragment>
              {days.map(day => (
                <span class="flex h-10 w-10 items-center justify-center font-semibold text-xs">{day}</span>
              ))}

              {this.getLastDatesOfLostMonth()}
              {this.getDatesOfMonth()}
              {this.getFirstDatesOfNextMonth()}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

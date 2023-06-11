import { Component, Host, Prop, State, h, Fragment } from '@stencil/core';
import { days, months } from '../../../utils/dateUtils';
import clsx from 'clsx';

export type DatePickerNavigationType = 'PREV' | 'NEXT';
type TabState = 'MONTH' | 'YEAR' | null;

export type SelectedState = 'START' | 'SINGLE' | 'END' | undefined;
interface DateItem {
  date?: number;
  isToday?: boolean;
  isSun?: boolean;
  extendedDate?: boolean;
  disabled?: boolean;
  preSelected?: boolean;
  selectedType?: SelectedState;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

@Component({
  tag: 'single-date-picker',
  styleUrl: 'single-date-picker.css',
})
export class SingleDatePicker {
  @Prop() currentMonth!: number;
  @Prop() currentYear!: number;

  @State() activeTab: TabState = null;
  @State() numberofYearsShown: number = 12;
  @State() stackedYearIntervals: number = 0;

  @State() lastDateofMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

  @State() firstDayofMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  @State() lastDayofMonth = new Date(this.currentYear, this.currentMonth, this.lastDateofMonth).getDay();

  @State() lostMonth = new Date(this.currentYear, this.currentMonth, 0);
  @State() lostMonthIndex = this.lostMonth.getMonth();
  @State() lastDateofLostMonth = this.lostMonth.getDate();

  private handleToggleTab(v: TabState) {
    // reset stacked year intervals to 0
    if (v === 'YEAR') this.stackedYearIntervals = 0;

    this.activeTab = this.activeTab === v ? null : v;
  }

  // private handlePrevNext(
  //   type: DatePickerNavigationType,
  //   cb?: (year: number, month: number) => void
  // ) {
  //   if (!this.activeTab) {
  //     const newCurrentMonth = this.currentMonth + (type === "PREV" ? -1 : 1)

  //     if (newCurrentMonth < 0 || newCurrentMonth > 11) {
  //       const newDate = new Date(
  //         this.currentYear,
  //         newCurrentMonth,
  //         new Date().getDate()
  //       )

  //       setCurrentMonth(newDate.getMonth(), newDate.getFullYear(), id)
  //       setCurrentYear(newDate.getFullYear(), newDate.getMonth(), id)

  //       if (cb) cb(newDate.getFullYear(), newDate.getMonth())
  //     } else {
  //       setCurrentMonth(newCurrentMonth, this.currentYear, id)

  //       if (cb) cb(currentYear, newCurrentMonth)
  //     }
  //   }

  //   if (activeTab === "YEAR") {
  //     setStackedYearIntervals(
  //       (prev) =>
  //         prev + (type === "PREV" ? -numberofYearsShown : numberofYearsShown)
  //     )
  //   }
  // }

  private handleActiveMonth(month: number) {
    // setCurrentMonth(month, currentYear, id)
    this.activeTab = null;
  }

  private handleActiveYear(year: number) {
    // setCurrentYear(year, currentMonth, id)
    this.activeTab = null;
  }

  private dateItem({ date, isToday, isSun, extendedDate, disabled, preSelected, selectedType, onClick, onMouseEnter }: DateItem) {
    return (
      <button
        class={clsx(
          'relative flex h-10 w-10 items-center justify-center font-semibold font-family text-xs',
          selectedType
            ? [
                'bg-green-600 text-white',
                (selectedType === 'START' || selectedType === 'END') && 'hover:rounded-lg',
                selectedType === 'START' && 'rounded-l-lg',
                selectedType === 'SINGLE' && 'rounded-lg',
                selectedType === 'END' && 'rounded-r-lg',
              ]
            : isToday || preSelected
            ? 'text-green-600'
            : extendedDate
            ? isSun
              ? 'text-red-300'
              : 'text-gray-300'
            : isSun && 'text-red-600',
          preSelected && 'bg-green-50',
          !extendedDate && !selectedType && !preSelected && !disabled && 'rounded-lg hover:bg-green-600 hover:text-white',
          extendedDate && !disabled && 'rounded-lg hover:bg-green-600/70 hover:text-white/70',
        )}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        {disabled && <span class={clsx('absolute h-px w-1/3', extendedDate ? 'bg-gray-300' : 'bg-gray-900')}></span>}
        {date}
      </button>
    );
  }

  private getLastDatesOfLostMonth() {
    const el: Element[] = [];

    for (let i = this.firstDayofMonth; i > 0; i--) {
      let lostDate = this.lastDateofLostMonth - i + 1;
      let day = new Date(this.currentYear, this.lostMonthIndex, lostDate).getDay();

      let isSun = day === 0;
      const mergedDate = new Date(this.currentYear, this.currentMonth - 1, lostDate);

      el.push(this.dateItem({ date: lostDate, isSun, extendedDate: true }));
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

      el.push(this.dateItem({ date: i, isToday, isSun }));
    }

    return el;
  }

  private getFirstDatesOfNextMonth() {
    const el: Element[] = [];

    for (let i = this.lastDayofMonth; i < 6; i++) {
      const date = i - this.lastDayofMonth + 1;
      const mergedDate = new Date(this.currentYear, this.currentMonth + 1, date);

      el.push(this.dateItem({ date, extendedDate: true }));
    }

    return el;
  }

  render() {
    return (
      <div class="flex flex-col p-5">
        <div class="flex items-center justify-between gap-2 rounded-md border border-gray-300 px-2 py-1.5">
          {this.activeTab !== 'MONTH' && (
            <prev-next-button
              direction="prev"
              isYearNegative={this.activeTab === 'YEAR' && this.currentYear + this.stackedYearIntervals < 0}
              onClick={() => {
                console.log('prev');
              }}
            />
          )}

          <month-year-switcher label={months[this.currentMonth]} isNavigator active={this.activeTab === 'MONTH'} onClick={() => this.handleToggleTab('MONTH')} />
          <month-year-switcher label={this.currentYear} isNavigator active={this.activeTab === 'YEAR'} onClick={() => this.handleToggleTab('YEAR')} />

          {this.activeTab !== 'MONTH' && (
            <prev-next-button
              direction="next"
              onClick={() => {
                console.log('next');
              }}
            />
          )}
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

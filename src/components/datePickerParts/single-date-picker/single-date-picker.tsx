import { Component, Host, Prop, State, h } from '@stencil/core';
import { days } from '../../../utils/dateUtils';

type TabState = 'MONTH' | 'YEAR' | null;

@Component({
  tag: 'single-date-picker',
  styleUrl: 'single-date-picker.css',
  shadow: true,
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

  render() {
    return (
      <Host>
        <div class="header">
          <prev-next-button direction="prev" />
          <month-year-switcher label="MAY" isNavigator />
          <month-year-switcher label="2023" isNavigator />
          <prev-next-button direction="next" />
        </div>

        <div class="body">
          {days.map(day => (
            <span>{day}</span>
          ))}

          {(() => {
            let dateComps: Element[] = [];
            let key = 0;

            //getting all last dates of lost month
            for (let i = this.firstDayofMonth; i > 0; i--) {
              let lostDate = this.lastDateofLostMonth - i + 1;
              let day = new Date(this.currentYear, this.lostMonthIndex, lostDate).getDay();

              let isSun = day === 0;
              const mergedDate = new Date(this.currentYear, this.currentMonth - 1, lostDate);

              dateComps.push(<date-item key={key} date={lostDate} />);
              key++;
            }

            //getting all dates of the month
            for (let i = 1; i <= this.lastDateofMonth; i++) {
              const date = new Date(this.currentYear, this.currentMonth, i);
              let day = date.getDay();

              let isSun = day === 0;
              let isToday = i === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear();

              dateComps.push(<date-item key={key} date={i} />);
              key++;
            }

            //getting first dates of next month
            for (let i = this.lastDayofMonth; i < 6; i++) {
              const date = i - this.lastDayofMonth + 1;
              const mergedDate = new Date(this.currentYear, this.currentMonth + 1, date);

              dateComps.push(<date-item key={key} date={date} />);
              key++;
            }

            return dateComps;
          })()}
        </div>
      </Host>
    );
  }
}

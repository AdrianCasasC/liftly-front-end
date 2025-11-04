import { Component, computed, OnInit, signal } from '@angular/core';
import { getEuropeDay, getMonthNameByNumber } from '../../utils/date';
import { NgClass } from '@angular/common';

@Component({
  selector: 'liftly-calendar',
  imports: [NgClass],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  /* Variables */
  now = new Date();

  /* Signals */
  selectedYear = signal<number>(this.now.getFullYear());
  selectedMonth = signal<number>(this.now.getMonth());
  daysInCurrentMonth = computed(() => new Date(this.selectedYear(), this.selectedMonth() + 1, 0).getDate())
  currentDayNumber = signal<number>(this.now.getDate());
  firstDayOfMonth = computed(() => getEuropeDay(new Date(this.selectedYear(), this.selectedMonth(), 1)))
  lastDayOfMonth = computed(() => getEuropeDay(new Date(this.selectedYear(), this.selectedMonth(), 0)))
  selectedMonthName = computed(() => getMonthNameByNumber(this.selectedMonth()))


  onPrevMonth(): void {
    const prevMonth = this.selectedMonth() === 0 ? 11 : this.selectedMonth() - 1;
    const prevYear = this.selectedMonth() === 0 ? this.selectedYear() - 1 : this.selectedYear();

    this.selectedMonth.set(prevMonth);
    this.selectedYear.set(prevYear);
  }
  
  onNextMonth(): void {
    const prevMonth = this.selectedMonth() === 11 ? 0 : this.selectedMonth() + 1;
    const prevYear = this.selectedMonth() === 11 ? this.selectedYear() + 1 : this.selectedYear();
    
    this.selectedMonth.set(prevMonth);
    this.selectedYear.set(prevYear);
  }
}

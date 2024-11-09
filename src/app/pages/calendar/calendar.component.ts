import { NgClass, NgFor } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  inject,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterOutlet } from '@angular/router';
import { DateNavigationService } from '@services/datenavigation.service';
import { generateHourSlotsWithAmPm, generateMinuteSlots } from 'src/app/utility/timeGenerator';
import { HourOnlyPipe } from 'src/app/pipes/hourOnlyPipe';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgFor,
    HourOnlyPipe,
    DragDropModule,
    MatDatepickerModule,
    RouterOutlet,
    NgClass,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements AfterViewInit, OnInit {
  router = inject(Router);
  private dateNavigationService = inject(DateNavigationService);
  @ViewChild('calendar', { static: false }) calendar!: MatCalendar<Date>;
  selected = model<Date>();
  hourSlots!: Array<string>;
  minuteSlots!: Array<string>;
  isDragging = false;
  startSelection: string | null = null;
  endSelection: string | null = null;
  ngOnInit(): void {
    this.hourSlots = generateHourSlotsWithAmPm();
    this.minuteSlots = generateMinuteSlots();
  }
  ngAfterViewInit(): void {
    this.dateNavigationService.selectedDate$.subscribe((value) => {
      this.calendar!._goToDateInView(value, 'month');
      this.selected.set(value);
    });
  }
  onDateChange(date: Date) {
    this.dateNavigationService.navigateOnDateChange(date);
  }
  onMouseDown(timeSlot: string) {
    this.isDragging = true;
    this.startSelection = timeSlot;
    this.endSelection = null; // Reset end selection
  }

  onMouseMove(timeSlot: string) {
    if (this.isDragging) {
      this.endSelection = timeSlot;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    // Handle any final logic when mouse dragging ends
  }

  isTimeSelected(timeSlot: string): boolean {
    if (!this.startSelection || !this.endSelection) {
      return false;
    }

    // Logic to determine if a time slot falls within the selected range
    const startIndex = this.getTimeSlotIndex(this.startSelection);
    const endIndex = this.getTimeSlotIndex(this.endSelection);
    const currentIndex = this.getTimeSlotIndex(timeSlot);

    if (startIndex <= endIndex) {
      return currentIndex >= startIndex && currentIndex <= endIndex;
    } else {
      return currentIndex >= endIndex && currentIndex <= startIndex;
    }
  }

  getTimeSlotIndex(timeSlot: string): number {
    // Custom logic to get the index of a time slot from hourSlots and minuteSlots
    const hourIndex = this.hourSlots.indexOf(timeSlot);
    if (hourIndex !== -1) return hourIndex;

    const minuteIndex = this.minuteSlots.indexOf(timeSlot);
    return minuteIndex;
  }
}

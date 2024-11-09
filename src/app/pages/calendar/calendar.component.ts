import { NgFor } from '@angular/common';
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
import { generateTimeSlotsWithAmPm } from 'src/app/utility/timeGenerator';
import { HourOnlyPipe } from 'src/app/pipes/hourOnlyPipe';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgFor,
    HourOnlyPipe,
    MatDatepickerModule,
    RouterOutlet,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements AfterViewInit, OnInit {
  timeSlots!: Array<string>;
  ngOnInit(): void {
    this.timeSlots = generateTimeSlotsWithAmPm();
    // console.log(timeSlots);
  }
  ngAfterViewInit(): void {
    this.dateNavigationService.selectedDate$.subscribe((value) => {
      this.calendar!._goToDateInView(value, 'month');
      this.selected.set(value);
    });
  }
  router = inject(Router);
  @ViewChild('calendar', { static: false }) calendar!: MatCalendar<Date>;
  private dateNavigationService = inject(DateNavigationService);
  selected = model<Date>();
  onDateChange(date: Date) {
    this.dateNavigationService.navigateOnDateChange(date);
  }
}

import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  HostListener,
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
    NgStyle,
    NgIf,
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
  isSelecting = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  overlayStyles = {};
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
  startSelectionPoint: string | undefined;
  endSelectionPoint: string | undefined;
  // -------------------------
  startSelection(h: any, m: any) {
    this.isSelecting = true;
    this.startSelectionPoint = `${h}-${m}`;
  }
  endSelection(h: any, m: any) {
    this.isSelecting = false;
    this.endSelectionPoint = `${h}-${m}`;
    console.log('ended here : ', h, m);
  }
  selectedSlots: Set<string> = new Set();

  onMouseMove(h: any, m: any) {
    if (this.isSelecting) {
      const slotKey = `${h}-${m}`;

      // Check if this combination has already been logged
      if (!this.selectedSlots.has(slotKey)) {
        console.log('mouse move:', h, m);

        // Add this combination to the Set to prevent future logs
        this.selectedSlots.add(slotKey);
      }
    }
  }
  isSlotLogged(hour: any, minute: any): boolean {
    const slotKey = `${hour}-${minute}`;
    return this.selectedSlots.has(slotKey);
  }
}

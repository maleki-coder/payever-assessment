import { NgFor } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterOutlet } from '@angular/router';
import { DateNavigationService } from '@services/datenavigation.service';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgFor,
    MatDatepickerModule,
    RouterOutlet,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  router = inject(Router);
  private dateNavigationService = inject(DateNavigationService);
  selected = model<Date>(new Date());
  onDateChange(date: Date) {
    this.dateNavigationService.navigateOnDateChange(date);
  }
  ngOnInit(): void {
    this.dateNavigationService.selectedDate$.subscribe((value) => {
      this.selected.set(value);
    });
  }
}

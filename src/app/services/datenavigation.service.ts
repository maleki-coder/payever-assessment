import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateNavigationService {
  private selectedDateSource = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSource.asObservable();
  selectedDate: Date = new Date();
  private formattedDateSource = new BehaviorSubject<string>('');
  formattedDate$ = this.formattedDateSource.asObservable();
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const date = event.urlAfterRedirects.replace('/calendar/', '');
        const dateParts = date.split('/').slice(-3);
        if (dateParts.length === 3) {
          const [year, month, day] = dateParts;
          this.selectedDate = new Date(+year, +month - 1, +day);
          this.updateSelectedDate(this.selectedDate);
        } else {
          this.updateSelectedDate(new Date());
        }
        this.updateFormattedDate();
      });
  }
  updateFormattedDate(): void {
    if (this.selectedDate) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      this.formattedDateSource.next(
        this.selectedDate.toLocaleDateString('en-US', options)
      );
    }
  }
  updateSelectedDate(date: Date): void {
    this.selectedDateSource.next(date);
  }
  incrementOrDecrementDate(action: 'increment' | 'decrement') {
    if (this.selectedDate) {
      const nextDay = new Date(this.selectedDate);
      const offset = action === 'increment' ? 1 : -1;
      nextDay.setDate(this.selectedDate.getDate() + offset);
      
      this.router.navigate([
        '/calendar',
        nextDay.getFullYear(),
        nextDay.getMonth() + 1,
        nextDay.getDate(),
      ]);
    }
  }
  navigateOnDateChange(date :Date){
    if (date) {
      // Format the date as yyyy/MM/dd
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.router.navigate(['/calendar', year, month, day]);
    }
  }
}

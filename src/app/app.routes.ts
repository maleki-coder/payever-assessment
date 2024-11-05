import { Routes } from '@angular/router';
import { CalendarComponent } from '@pages/calendar/calendar.component';



export const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
];

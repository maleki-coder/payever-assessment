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
  {
    path: 'calendar/:year/:month/:day',
    component: CalendarComponent,
  },
];

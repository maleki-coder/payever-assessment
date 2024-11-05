import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '@components/header/header.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatSidenavModule, HeaderComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {}

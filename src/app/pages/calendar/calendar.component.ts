import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '@components/header/header.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, NgFor],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  divs = Array(100).fill(0).map((_, index) => index + 1);
}

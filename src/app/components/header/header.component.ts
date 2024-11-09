import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DateNavigationService } from '@services/datenavigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private dateNavigationService = inject(DateNavigationService);

  formattedDate: string = '';
  ngOnInit(): void {
    this.dateNavigationService.formattedDate$.subscribe((value) => {
      this.formattedDate = value;
    });
  }
  navigateTo(type: 'decrement' | 'increment') {
    this.dateNavigationService.incrementOrDecrementDate(type);
  }
}

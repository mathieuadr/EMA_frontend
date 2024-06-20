import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  title = 'EMA_frontend';

  onToggleSidenav(): void {
    this.sidenav.toggle();
  }
}
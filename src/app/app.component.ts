import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  title = 'EMA_frontend';
  showTopBar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showTopBar = !['/', '/signin'].includes(event.urlAfterRedirects);
      }
    });
  }
  onToggleSidenav(): void {
    this.sidenav.toggle();
  }
}
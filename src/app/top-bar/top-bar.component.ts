// top-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  confirmLogout(event: Event): void {
    event.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      this.authService.clearUserId();
      this.router.navigate(['/']);
    }
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {


  constructor(private router: Router,
    private authService: AuthService
  ) {}
  confirmLogout(event: Event): void {
    event.preventDefault(); // Empêche le lien de naviguer immédiatement
    if (confirm('Are you sure you want to log out?')) {
      this.authService.clearUserId();
      this.router.navigate(['/']); // Navigue vers la page d'accueil
    }
  }
}

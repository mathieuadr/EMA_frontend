// top-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';
import { UserService } from '../A_Data/services/User.services';
import { User } from '../A_Data/User';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  current_user!: User;

  constructor(private router: Router, private authService: AuthService, private userservice : UserService) {
    
  }

  ngOnInit(){
    this.loadUser;
  }

  confirmLogout(event: Event): void {
    event.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      this.authService.clearUserId();
      this.router.navigate(['/']);
    }

  }



  loadUser(): void {
    const userId = this.authService.getUserId();
    if (userId === 'Unknown') {
      this.router.navigate(['/']);
    } else {
      this.userservice.getById(userId).subscribe({
        next: (user) => {
          this.current_user = user;
        },
        error: (err) => {
          console.error('Error loading user', err);
          this.router.navigate(['/']); // Navigate to home or an error page
        }
      });
    }
    }
}

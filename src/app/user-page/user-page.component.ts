import { Component } from '@angular/core';
import { User } from '../A_Data/User';
import { UserService } from '../A_Data/services/User.services';
import { Event, Router } from '@angular/router';
import { AuthService } from '../A_Data/services/auth.service';
import { audit } from 'rxjs';
import { RegistrationService } from '../A_Data/services/Registration.services';
import { EventService } from '../A_Data/services/Event.services';
import { Event_Proj } from '../A_Data/Event_proj';
import { Registration } from '../A_Data/Registration';
import { parse, isAfter } from 'date-fns';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  [x: string]: any;
  user_actual!: User;
  date_now: Date;
  registration: Registration[] = [];
  User_events: Event_Proj[] = [];

  constructor(private userservice: UserService, private router: Router, private auth: AuthService, private registrationService: RegistrationService,
    private EventService: EventService
  ) {
    this.date_now = new Date(Date.now());
  }
  ngOnInit(): void {
    this.loadUser();
    this.loadEvents();
    this.loadMyEvents();
    this.date_now = new Date(Date.now());
  }

  loadUser(): void {
    const userId = this.auth.getUserId();
    if (userId === 'Unknown') {
      this.router.navigate(['/']);
    } else {
      this.userservice.getById(userId).subscribe({
        next: (user) => {
          this.user_actual = user;
        },
        error: (err) => {
          console.error('Error loading user', err);
          this.router.navigate(['/']); // Navigate to home or an error page
        }
      });
    }
  }





  loadEvents(): void {
    this.registrationService.getRegistrationbyUserID(this.auth.getUserId()).subscribe({
      next: (registrations) => {
        this.registration = registrations
      },
      error: (err) => {
        console.error('Error loading events', err);
      }
    });
  }




  loadMyEvents() {
    this.EventService.getEventbyIdCreator(this.auth.getUserId()).subscribe(events => {
      this.User_events = events;
    });
  }




  Unregister(id_registration: String) {
    this.registrationService.delete(id_registration).subscribe({
      next: (user) => {
        this.loadEvents()
      },
      error: (err) => {
        console.error('Error loading user', err);
        this.router.navigate(['/']); // Navigate to home or an error page
      }
    });;
  }


  isEventActive(eventEndDate: Date): boolean {
    return new Date(eventEndDate) > this.date_now;
  }
  
  handleFeedbackSubmitted(feedback: string): void {
    console.log(`Feedback submitted: ${feedback}`);
  }

}

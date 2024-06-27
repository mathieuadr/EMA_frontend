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
import { AddFeedbackComponent } from '../Add_component/add-feedback/add-feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { Feedback } from '../A_Data/Feedback';
import { FeedbackService } from '../A_Data/services/FeedBack.service';
import { ToastService } from '../A_Data/services/A_Outil/Toast';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  [x: string]: any;
  user_actual!: User;
  registration: Registration[] = [];
  User_events: Event_Proj[] = [];
  user_feedback : Feedback[]=[];

  constructor(private userservice: UserService, private router: Router, private auth: AuthService, 
    private registrationService: RegistrationService,private toast: ToastService,
    private EventService: EventService, private dialog: MatDialog, private feedbackservice : FeedbackService
  ) {
    
  }
  ngOnInit(): void {
    this.loadUser();
    this.loadEvents();
    this.loadMyEvents();
    this.loadFeedback();
  }


  // loading methods
  
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


  loadFeedback(): void{
      this.feedbackservice.GetFeebackByIdUser(this.auth.getUserId()).subscribe({
        next: (Feedbacks) => {
          this.user_feedback = Feedbacks
        },
        error: (err) => {
          console.error('Error loading events', err);
        }
      });
  }




  loadEvents(): void {
    this.registrationService.getRegistrationbyUserID(this.auth.getUserId()).subscribe({
      next: (registrations) => {
        this.registration = registrations;
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


// deletes methods 

  Unregister(id_registration: String) {
    this.registrationService.delete(id_registration).subscribe({
      next: (user) => {
        this.loadEvents()
        this.toast.showSuccess("Registration deleted")
      },
      error: (err) => {
        this.toast.showError("Impossible")
        console.error('Error deleting registration', err);
        this.router.navigate(['/']); // Navigate to home or an error page
      }
    });;
  }

  
  DeleteFeedback(id_feedback: String){
    this.feedbackservice.delete(id_feedback).subscribe({
      next: (user) => {
        this.loadFeedback();
        this.toast.showSuccess("Feedback deleted")
      },
      error: (err) => {
        this.toast.showError("Impossible")
        console.error('Error deleting feedback', err);
        this.router.navigate(['/']); // Navigate to home or an error page
      }
    });;
  }

  DeleteEvent(id_event : String){
    this.EventService.delete(id_event).subscribe({
      next: (user) => {
        this.loadMyEvents();
        this.toast.showSuccess("Event deleted")
      },
      error: (err) => {
        this.toast.showError("Impossible")
        console.error('Error deleting feedback', err);
        this.router.navigate(['/']); // Navigate to home or an error page
      }
    });;
  }


  // méthodes annexes

  isEventActive(eventEndDate: Date): boolean {
    return new Date(eventEndDate) > new Date(Date.now());
  }

  openFeedbackDialog(registrationID: string) {
    const dialogRef = this.dialog.open(AddFeedbackComponent, {
      width: '800px',
      height:'450px',
      data: { registrationID: registrationID }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  



}

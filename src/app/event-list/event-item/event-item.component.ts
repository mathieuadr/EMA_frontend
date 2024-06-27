import { Component, Input } from '@angular/core';
import { Event_Proj } from '../../A_Data/Event_proj';
import { User } from '../../A_Data/User';
import { AuthService } from '../../A_Data/services/auth.service';
import { EventService } from '../../A_Data/services/Event.services';
import { RegistrationService } from '../../A_Data/services/Registration.services';
import Swal from 'sweetalert2';
import { Feedback } from '../../A_Data/Feedback';
import { FeedbackService } from '../../A_Data/services/FeedBack.service';
import { ToastService } from '../../A_Data/services/A_Outil/Toast';



@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent {
  @Input()
  Event!:Event_Proj;
  Feedbacks : Feedback[]=[];


  constructor(
    private feedbackservice :FeedbackService,
    private authService: AuthService,
    private registrationService : RegistrationService,
    private toast : ToastService
  ){}

  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  register(): void {
    const userId = this.authService.getUserId(); // Méthode pour obtenir l'ID utilisateur à partir de AuthService
    this.registrationService.registerUserToEvent(userId, this.Event.idEvent).subscribe(
    (response: any) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Registration confirmed',
          });
    }, (error: any) => {
      this.Toast.fire({
        icon: 'error',
        title: 'Erreur!',
        text: error.message || 'An error occurred'
      })
    });
  }

  loadFeedback(id_event :String ){
    this.feedbackservice.getFeedbackbyEvent(id_event).subscribe(
      (feedbacks: Feedback[]) => {
        this.Feedbacks = feedbacks;
      },
      (error: any) => {
        this.toast.showError("Error loading feedback")
      }
    );
  }
    isEventActive(eventEndDate: Date): boolean {
    return new Date(eventEndDate) > new Date(Date.now());
  }
}

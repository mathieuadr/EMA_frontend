import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../A_Data/services/A_Outil/Toast';
import { EventService } from '../../A_Data/services/Event.services';
import { Router } from '@angular/router';
import { AuthService } from '../../A_Data/services/auth.service';
import { Event_Proj } from '../../A_Data/Event_proj';
import { CustomValidators } from '../../A_Data/services/A_Outil/CustomValidators'; // Adjust the import path as necessary

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastService, private eventService: EventService, private router: Router, private authservice: AuthService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      dateBeginning: ['', Validators.required],
      date_end: ['', [Validators.required, CustomValidators.dateEndAfterDateBeginning('dateBeginning')]],
      location: ['', Validators.required],
      idCreator: [this.authservice.getUserId()]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const eventData = this.form.value;
      this.eventService.create(eventData).subscribe(
        (response: Event_Proj) => {
          this.toastService.showSuccess('Nouvel évenement créé');
          this.form.reset();
          this.router.navigate(['/home']);
        },
        (error: any) => {
          this.toastService.showError(error.message || 'An error occurred');
        }
      );
    } else {
      this.toastService.showError('Formulaire invalide!');
      return;
    }
  }

  get title() {
    return this.form.controls['title'];
  }
  get description() {
    return this.form.controls['description'];
  }
  get dateBeginning() {
    return this.form.controls['dateBeginning'];
  }
  get date_end() {
    return this.form.controls['date_end'];
  }
  get location() {
    return this.form.controls['location'];
  }
}

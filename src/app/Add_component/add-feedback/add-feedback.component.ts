
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../A_Data/services/A_Outil/Toast';
import { FeedbackService } from '../../A_Data/services/FeedBack.service';
import { AuthService } from '../../A_Data/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registration } from '../../A_Data/Registration';
@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})

export class AddFeedbackComponent {
  form: FormGroup;
  ratingValue: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastService: ToastService, private feedbackService: FeedbackService, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      registrationId : [data.registrationID],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  setRating(value: number) {
    this.ratingValue = value;
    this.form.controls['rating'].setValue(value);
  }

  onSubmit() {
    if (this.form.valid) {
      const feedbackData = this.form.value;
      this.feedbackService.create(feedbackData).subscribe(
        (response) => {
          this.toastService.showSuccess('Feedback create');
          this.form.reset();
          this.router.navigate(['/feedback']);
        },
        (error: any) => {
          this.toastService.showError(error.message || 'An error occured');
        }
      );
    } else {
      this.toastService.showError('Invalid informations!');
    }
  }

  get description() {
    return this.form.controls['description'];
  }

  get registration() {
    return this.form.controls['registration'];
  }

  get rating() {
    return this.form.controls['rating'];
  }
}
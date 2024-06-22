
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrl: './add-feedback.component.css'
})
export class AddFeedbackComponent {
  feedback: string = '';
  
  @Output() feedbackSubmitted = new EventEmitter<string>();

  onSubmit(): void {
    this.feedbackSubmitted.emit(this.feedback);
  }
}

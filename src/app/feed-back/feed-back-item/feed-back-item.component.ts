import { Component, Input } from '@angular/core';
import { Feedback } from '../../A_Data/Feedback';

@Component({
  selector: 'app-feed-back-item',
  templateUrl: './feed-back-item.component.html',
  styleUrl: './feed-back-item.component.css'
})
export class FeedBackItemComponent {
  @Input()
  feedback!:Feedback;

}

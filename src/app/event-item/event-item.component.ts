import { Component, Input } from '@angular/core';
import { Event } from '../A_Data/Event';
import { User } from '../A_Data/User';


@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent {
  @Input()
  Event!:Event;
}

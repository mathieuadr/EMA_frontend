import { Component } from '@angular/core';
import { EventService } from '../A_Data/services/Event.services';
import { Event } from '../A_Data/Event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events :Event[]=[];
  
  constructor(private eventService : EventService){
  }

  ngOnInit(): void {
      this.loadEvent();
  }

  loadEvent(): void{
    this.eventService.getAll().subscribe( events => {
      this.events=events;
    });
  }
}

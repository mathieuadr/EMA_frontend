import { Component } from '@angular/core';
import { EventService } from '../A_Data/services/Event.services';
import { Event_Proj } from '../A_Data/Event_proj';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events :Event_Proj[]=[];
  
  constructor(private eventService : EventService, private router : Router){
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

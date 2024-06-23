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
  filterDate: string | undefined;
  filterLocation: string | undefined;
  filterIdCreator: string | undefined;
  
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

  searchEvents(): void {
    if (this.filterDate) {
      this.filterDate = this.formatDate(new Date(this.filterDate));
    }
    this.eventService.getByFilter(this.filterDate, this.filterLocation, this.filterIdCreator).subscribe(events => {
      this.events = events;
    });
  }

   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    
    return `${year}-${month}-${day}`;
  }
  
}

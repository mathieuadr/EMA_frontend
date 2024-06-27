import { Component } from '@angular/core';
import { EventService } from '../A_Data/services/Event.services';
import { Event_Proj } from '../A_Data/Event_proj';
import {  Router } from '@angular/router';
import { User } from '../A_Data/User';
import { UserService } from '../A_Data/services/User.services';
import { FeedbackService } from '../A_Data/services/FeedBack.service';
import { Feedback } from '../A_Data/Feedback';


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
  Users :User[] =[];
  
  
  constructor(private eventService : EventService, private router : Router, private userservice :UserService){
  }


  ngOnInit(): void {
    this.loadEvent();
    this.loadUsers();
  }

  loadEvent(): void{
    this.eventService.getAll().subscribe( events => {
      this.events=events;
    });
  }

  searchEvents(): void {  
    this.eventService.getByFilter(this.filterDate, this.filterLocation, this.filterIdCreator).subscribe(events => {
      this.events = events;
    });
  }

  loadUsers(): void {
    this.userservice.getAll().subscribe(users => {
      this.Users = users;
    });
  }
  

}

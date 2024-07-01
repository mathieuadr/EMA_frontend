import { Component } from '@angular/core';
import { EventService } from '../A_Data/services/Event.services';
import { Event_Proj } from '../A_Data/Event_proj';
import { Router } from '@angular/router';
import { User } from '../A_Data/User';
import { UserService } from '../A_Data/services/User.services';
import { FeedbackService } from '../A_Data/services/FeedBack.service';
import { Feedback } from '../A_Data/Feedback';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {
  events: Event_Proj[] = [];
  filterDate: string | undefined;
  filterLocation: string | undefined;
  filterIdCreator: string | undefined;
  Users: User[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private eventService: EventService, 
    private router: Router, 
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.searchEvents();
    this.loadUsers();
  }


  searchEvents(): void {
    console.log('Searching with:', this.filterDate, this.filterLocation, this.filterIdCreator);  // Ajout de log pour vérifier les valeurs des filtres

    this.eventService.getByFilter(this.filterDate, this.filterLocation, this.filterIdCreator).subscribe(events => {
      this.events = events;
      this.sortEvents();
    });
  }

  loadUsers(): void {
    this.userservice.getAll().subscribe(users => {
      this.Users = users;
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortEvents();
  }

  sortEvents(): void {
    this.events.sort((a, b) => {
      const dateA = new Date(a.date_end).getTime();
      const dateB = new Date(b.date_end).getTime();

      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
  resetFilters() {
    this.filterDate = '';
    this.filterLocation = '';
    this.filterIdCreator = ''
    this.searchEvents();
  }
}

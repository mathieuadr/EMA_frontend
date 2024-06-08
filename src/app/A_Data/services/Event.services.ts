import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Event } from "../Event";
@Injectable({
    providedIn: 'root'
  })
export class EventService{
  
  private PostUrl = `${environment.apiUrl}v1/Event`;

  constructor(private http: HttpClient){}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.PostUrl);
    }
}
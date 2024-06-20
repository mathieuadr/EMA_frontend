import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Event, EventCreateInput } from "../Event";
@Injectable({
    providedIn: 'root'
  })
export class EventService{

  
  private PostUrl = `${environment.apiUrl}v1/Event`;

  constructor(private http: HttpClient){}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.PostUrl);
    }
  
  Create( event: EventCreateInput):Observable<Event>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponse<Event>>(this.PostUrl+"/Create",event,{ headers, observe: 'response' }).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body as unknown as Event; // Extraction du corps de la réponse si le statut est 200
        } else {
          throw new Error('Create event failed');
        }
      }));
  }

  
}
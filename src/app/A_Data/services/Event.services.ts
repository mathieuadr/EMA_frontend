import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Event_Proj, EventCreateInput } from "../Event_proj";
@Injectable({
    providedIn: 'root'
  })
export class EventService{

  
  private PostUrl = `${environment.apiUrl}v1/Event`;

  constructor(private http: HttpClient){}

  getAll(): Observable<Event_Proj[]> {
    return this.http.get<Event_Proj[]>(this.PostUrl);
    }
  
  Create( event: EventCreateInput):Observable<Event_Proj>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponse<Event_Proj>>(this.PostUrl+"/Create",event,{ headers, observe: 'response' }).pipe(
      map(response => {
        if (response.status === 200) {
          return response.body as unknown as Event_Proj; // Extraction du corps de la réponse si le statut est 200
        } else {
          throw new Error('Create event failed');
        }
      }));
  }

  
}
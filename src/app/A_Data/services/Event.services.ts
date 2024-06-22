import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { Event_Proj, EventCreateInput } from "../Event_proj";
import BaseService from "./Base-service";
@Injectable({
    providedIn: 'root'
  })
export class EventService extends BaseService<Event_Proj,EventCreateInput>{


  
  private PostUrl = `${environment.apiUrl}v1/Event`;

  override getEndpointUrl(): string {
    return this.PostUrl;
  }
  
  getEventbyIdCreator(user_id : string){
    if(user_id==null){
      return throwError(() => new Error('No user authenticated'));
    }
    return this.http.get<Event_Proj[]>(`${this.PostUrl}/getbyidcreator/${user_id}`).pipe(
      catchError(error => {
        console.error('Error fetching event', error);
        return throwError(() => new Error('Error fetching event'));
      })
    );
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
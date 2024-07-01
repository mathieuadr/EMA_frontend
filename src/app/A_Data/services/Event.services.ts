import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
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
  getByFilter(date?: string, location?: string, idCreator?: string): Observable<Event_Proj[]> {
    let params = new HttpParams();
    
    if (date) {
      params = params.set('startDate', date);
    }
    if (location) {
      params = params.set('location', location);
    }
    if (idCreator) {
      params = params.set('idCreator', idCreator);
    }

    console.log('Params:', params.toString());  // Ajout de log pour vérifier les paramètres

    return this.http.get<Event_Proj[]>(`${this.PostUrl}/getByFilter`, { params });
  }

  
}
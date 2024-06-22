import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Registration, RegistrationCreateInput } from "../Registration";
import BaseService from "./Base-service";


@Injectable({
    providedIn: 'root'
  })
export class RegistrationService extends BaseService<Registration,RegistrationCreateInput>{

  
  private PostUrl = `${environment.apiUrl}v1/Registration`;
  
  override getEndpointUrl(): string {
    return this.PostUrl;
  }
  


  getRegistrationbyUserID(user_id : string){
      if(user_id==null){
        return throwError(() => new Error('No user authenticated'));
      }
      return this.http.get<Registration[]>(`${this.PostUrl}/getallbyuserid/${user_id}`).pipe(
        catchError(error => {
          console.error('Error fetching registrations', error);
          return throwError(() => new Error('Error fetching registrations'));
        })
      );
  }


  registerUserToEvent(userId: String, eventId: String) {
    if(userId==='Unknown'){
      return throwError(() => new Error('No user authenticated'));
    }
    if(eventId===null){
      return throwError(() => new Error('Event ID is null'));
    }
    const loginData = { userId, eventId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<HttpResponse<String>>(this.PostUrl+"/create", loginData, { headers, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            return response.body as unknown as String; // Extraction du corps de la réponse si le statut est 200
          } else {
            throw new Error('Impossible to register');
          }
        }),
        catchError(error => {
          return throwError(() => new Error(error.message || 'An error occurred'));
        })
        
      );
    }
}

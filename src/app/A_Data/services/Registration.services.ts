import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User, UserCreateInput } from "../User";


@Injectable({
    providedIn: 'root'
  })
export class RegistrationService{
  
  private PostUrl = `${environment.apiUrl}v1/Registration`;
  
  constructor(private http: HttpClient) { }


  registerUserToEvent(userId: String| null, eventId: String) {
    if(userId===null){
      return throwError(() => new Error('No user authenticated'));
    }
    if(eventId===null){
      return throwError(() => new Error('Event ID is null'));
    }
    const loginData = { userId, eventId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<HttpResponse<String>>(this.PostUrl+"/Register", loginData, { headers, observe: 'response' })
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

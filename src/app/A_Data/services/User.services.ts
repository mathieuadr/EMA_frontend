import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, UserCreateInput } from "../User";
import BaseService from "./Base-service";


@Injectable({
    providedIn: 'root'
  })
export class UserService extends BaseService<User,UserCreateInput>{
  
  private PostUrl = `${environment.apiUrl}v1/Users`;

  override getEndpointUrl(): string {
    return this.PostUrl;
  }


  

  login(username: string, password: string): Observable<User> {
    const loginData = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<HttpResponse<User>>(this.PostUrl+"/Login", loginData, { headers, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            
            return response.body as unknown as User; // Extraction du corps de la réponse si le statut est 200
          } else {
            throw new Error('Authentication failed');
          }
        })
      );
  
}
}
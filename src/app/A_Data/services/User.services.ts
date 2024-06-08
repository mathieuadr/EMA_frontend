import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from "../User";


@Injectable({
    providedIn: 'root'
  })
export class UserService{
  private PostUrl = `${environment.apiUrl}v1/Users/Login/`;
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const loginData = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<HttpResponse<User>>(this.PostUrl, loginData, { headers, observe: 'response' })
      .pipe(
        map(response => response.body as User) // Extraction du corps de la réponse
      );
    }
  
}
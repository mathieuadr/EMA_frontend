import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feedback } from "../Feedback";

@Injectable({
    providedIn: 'root'
  })
  export class FeedbackService{

  
    private PostUrl = `${environment.apiUrl}v1/feedbacks`;
  
    constructor(private http: HttpClient){}
  
    getAll(): Observable<Feedback[]> {
      return this.http.get<Feedback[]>(this.PostUrl);
      }
  
    
  }
  
import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Feedback, FeedbackCreateInput } from "../Feedback";
import BaseService from "./Base-service";

@Injectable({
    providedIn: 'root'
  })
  export class FeedbackService extends BaseService<Feedback,FeedbackCreateInput>{


  
    private PostUrl = `${environment.apiUrl}v1/feedbacks`;
  
    override getEndpointUrl(): string {
      return this.PostUrl;
    }

    GetFeebackByIdUser(user_id : string){
      if(user_id==null){
        return throwError(() => new Error('No user authenticated'));
      }
      return this.http.get<Feedback[]>(`${this.PostUrl}/userid/${user_id}`).pipe(
        catchError(error => {
          console.error('Error fetching event', error);
          return throwError(() => new Error('Error fetching event'));
        })
      );
    }  
  
  
    
  }
  
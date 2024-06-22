import { Injectable } from "@angular/core";
import { environment } from "../../A_Environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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

  
  
    
  }
  
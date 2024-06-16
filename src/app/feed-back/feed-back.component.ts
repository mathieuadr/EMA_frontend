import { Component } from '@angular/core';
import { Feedback } from '../A_Data/Feedback';
import { FeedbackService } from '../A_Data/services/FeedBack.service';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrl: './feed-back.component.css'
})
export class FeedBackComponent {
  feedb :Feedback[]=[];
  
  constructor(private feedBackService : FeedbackService){
  }

  ngOnInit(): void {
      this.loadFeedb();
  }

  loadFeedb(): void{
    this.feedBackService.getAll().subscribe( feedb => {
      this.feedb=feedb;
    });
  }
}

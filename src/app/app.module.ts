import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';
import { RouterModule } from '@angular/router';
import { UserService } from './A_Data/services/User.services';
import { HttpClientModule } from '@angular/common/http';
import { EventListComponent } from './event-list/event-list.component';
import { EventItemComponent } from './event-list/event-item/event-item.component';
import { EventService } from './A_Data/services/Event.services';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegistrationService } from './A_Data/services/Registration.services';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { FeedBackItemComponent } from './feed-back/feed-back-item/feed-back-item.component';
import { FeedbackService } from './A_Data/services/FeedBack.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTab, MatTabGroup} from '@angular/material/tabs';
import { AddEventComponent } from './Add_component/add-event/add-event.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AddFeedbackComponent } from './Add_component/add-feedback/add-feedback.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginPageComponent,
    HistoricalComponent,
    EventListComponent,
    EventItemComponent,
    SignInComponent,
    FeedBackComponent,
    FeedBackItemComponent,
    AddEventComponent,
    UserPageComponent,
    AddFeedbackComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,     
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,    
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTab,MatTabGroup,
    FormsModule
  ],
  providers: [UserService,
    EventService,
    RegistrationService,
    FeedbackService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

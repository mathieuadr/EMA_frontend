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
import { EventItemComponent } from './event-item/event-item.component';
import { EventService } from './A_Data/services/Event.services';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginPageComponent,
    HistoricalComponent,
    EventListComponent,
    EventItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,     
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule

  ],
  providers: [UserService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

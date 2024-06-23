import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';
import { EventListComponent } from './event-list/event-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { AddEventComponent } from './Add_component/add-event/add-event.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'histo',component: HistoricalComponent},
  {path:'events',component: EventListComponent},
  {path:'signin',component: SignInComponent},
  {path:'feedback',component: FeedBackComponent},
  {path:'addevent',component: AddEventComponent},
  {path:'home',component: UserPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

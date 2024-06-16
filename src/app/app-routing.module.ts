import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';
import { EventListComponent } from './event-list/event-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedBackComponent } from './feed-back/feed-back.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'histo',component: HistoricalComponent},
  {path:'home',component: EventListComponent},
  {path:'signin',component: SignInComponent},
  {path:'feedback',component: FeedBackComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

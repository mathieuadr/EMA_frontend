import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';
import { EventListComponent } from './event-list/event-list.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:'',component: LoginPageComponent},
  {path:'\histo',component: HistoricalComponent},
  {path:'\home',component: EventListComponent},
  {path:'\signin',component: SignInComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  {path:'\home',component: LoginPageComponent},
  {path:'\histo',component: HistoricalComponent},
  {path:'',component: EventListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

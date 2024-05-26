import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoricalComponent } from './historical/historical.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginPageComponent,
    HistoricalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

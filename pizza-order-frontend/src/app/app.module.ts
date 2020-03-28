import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhoneCallingComponent } from '../component/phone-calling/phone-calling.component';
import { StartProcessComponent } from '../component/start-process/start-process.component';
import {AppRoutingModule} from './app-routing.module';
import { PizzeriaAnsweredComponent } from '../component/pizzeria-answered/pizzeria-answered.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneCallingComponent,
    StartProcessComponent,
    PizzeriaAnsweredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

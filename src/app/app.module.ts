import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdIconModule, MdCardModule} from '@angular/material';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserAnimationsModule, BrowserModule, MdButtonModule, MdCheckboxModule,MdMenuModule, MdToolbarModule, MdIconModule, MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
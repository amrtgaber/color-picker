import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';

import {
  ColorComponent,
  HueComponent,
  OpacityComponent,
  SaturationComponent
} from './components';

import {
  ColorService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    ColorComponent,
    HueComponent,
    OpacityComponent,
    SaturationComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule
  ],
  providers: [
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

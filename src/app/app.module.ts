import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModule } from './typescripts/free';

import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { FormsModule }   from '@angular/forms';
import { ReversePipe } from './reverse.pipe';

import { environment } from '../environments/environment';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { RightComponent } from './right/right.component';
import { ListmemberComponent } from './listmember/listmember.component';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    HeaderComponent,
    ContentComponent,
    RightComponent,
    ListmemberComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    })
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

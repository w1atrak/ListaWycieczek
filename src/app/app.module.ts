import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OcenaWycieczkiComponent } from './ocena-wycieczki/ocena-wycieczki.component';
import { FiltrowanieWycieczekComponent } from './filtrowanie-wycieczek/filtrowanie-wycieczek.component';
import { FilterPipe } from './wycieczki/wycieczki.component';
import { KoszykWycieczekComponent } from './koszyk-wycieczek/koszyk-wycieczek.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    OcenaWycieczkiComponent,
    FiltrowanieWycieczekComponent,
    FilterPipe,
    KoszykWycieczekComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    // AppRoutingModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

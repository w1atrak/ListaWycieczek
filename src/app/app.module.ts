import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OcenaWycieczkiComponent } from './trip-details/ocena-wycieczki.component';
import { FiltrowanieWycieczekComponent } from './filtrowanie-wycieczek/filtrowanie-wycieczek.component';
import { FilterPipe } from './wycieczki/wycieczki.component';
import { FilterStatusPipe } from './history/history.component';
import { KoszykWycieczekComponent } from './koszyk-wycieczek/koszyk-wycieczek.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    OcenaWycieczkiComponent,
    FiltrowanieWycieczekComponent,
    FilterPipe,
    FilterStatusPipe,
    KoszykWycieczekComponent,
    HomeComponent,
    AddTripComponent,
    CartComponent,
    HistoryComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    // AppRoutingModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

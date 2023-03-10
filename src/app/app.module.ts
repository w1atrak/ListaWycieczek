import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './TripsComponents/trips/trips.component';
import {ReactiveFormsModule} from '@angular/forms';
import { OcenaWycieczkiComponent } from './TripsComponents/trip-details/ocena-wycieczki.component';
import { FiltrowanieWycieczekComponent } from './TripsComponents/filtrowanie-wycieczek/filtrowanie-wycieczek.component';
import { FilterPipe } from './TripsComponents/trips/trips.component';
import { FilterStatusPipe } from './TripsComponents/history/history.component';
import { KoszykWycieczekComponent } from './TripsComponents/koszyk-wycieczek/koszyk-wycieczek.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AddTripComponent } from './TripsComponents/add-trip/add-trip.component';
import { CartComponent } from './TripsComponents/cart/cart.component';
import { HistoryComponent } from './TripsComponents/history/history.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TripReviewComponent } from './TripsComponents/trip-review/trip-review.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModifyTripComponent } from './TripsComponents/modify-trip/modify-trip.component';
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
    NavbarComponent,
    TripReviewComponent,
    RegisterComponent,
    LoginComponent,
    AdminPanelComponent,
    ModifyTripComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AngularFireDatabaseModule,
    AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

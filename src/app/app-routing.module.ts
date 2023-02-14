import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WycieczkiComponent } from './TripsComponents/wycieczki/wycieczki.component';
import { OcenaWycieczkiComponent } from './TripsComponents/trip-details/ocena-wycieczki.component';
import { AddTripComponent } from './TripsComponents/add-trip/add-trip.component';
import { CartComponent } from './TripsComponents/cart/cart.component';
import { HistoryComponent } from './TripsComponents/history/history.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: WycieczkiComponent},
  {path: 'trip/:id', component: OcenaWycieczkiComponent, canActivate: [AuthGuard]},
  {path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}  
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

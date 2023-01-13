import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { OcenaWycieczkiComponent } from './trip-details/ocena-wycieczki.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: WycieczkiComponent},
  {path: 'trip/:id', component: OcenaWycieczkiComponent},
  {path: 'add-trip', component: AddTripComponent},
  {path: 'cart', component: CartComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}  
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

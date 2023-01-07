import { Injectable } from '@angular/core';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  trips: Wycieczka[] = [];
  boughtTrips: Wycieczka[] = [];

}

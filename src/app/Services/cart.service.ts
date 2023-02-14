import { Injectable } from '@angular/core';
import { Trip } from '../Interfaces/Trip';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  trips: Trip[] = [];
  boughtTrips: Trip[] = [];

  getCart(): Trip[] {
    return this.trips;
  }

}

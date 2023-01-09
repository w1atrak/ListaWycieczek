import { Component, Input, OnInit} from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-koszyk-wycieczek',
  templateUrl: './koszyk-wycieczek.component.html',
  styleUrls: ['./koszyk-wycieczek.component.css']
})
export class KoszykWycieczekComponent implements OnInit {

  constructor(private cartService: CartService ) { }

  trips: Wycieczka[] = [];
  tripsNumber: number = 0;
  tripsCost: number = 0;

  ngOnInit(): void {
    this.trips = this.cartService.getCart();
  }


  sumTripsStats() : number{
    this.tripsCost = 0;
    this.tripsNumber = 0;
    for(let trip of this.trips){
      this.tripsCost += trip.price * trip.reserved;
      this.tripsNumber += trip.reserved;
    }
    return this.tripsCost;
  }


}

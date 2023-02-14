import { Component, OnInit} from '@angular/core';
import { Trip } from '../../Interfaces/Trip';
import { CartService } from '../../Services/cart.service';
@Component({
  selector: 'app-koszyk-wycieczek',
  templateUrl: './koszyk-wycieczek.component.html',
  styleUrls: ['./koszyk-wycieczek.component.css']
})
export class KoszykWycieczekComponent implements OnInit {

  constructor(private cartService: CartService ) { }

  trips: Trip[] = [];
  tripsNumber: number = 0;
  tripsCost: number = 0;

  ngOnInit(): void {
    this.trips = this.cartService.getCart();
  }


  sumTripsStats() : number{
    this.tripsCost = 0;
    this.tripsNumber = 0;
    for(let trip of this.trips){
      // this.tripsCost += trip.price * trip.reserved;
      // this.tripsNumber += trip.reserved;
    }
    return this.tripsCost;
  }


}

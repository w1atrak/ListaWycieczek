import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService : CartService) { }

  tripsReserved : any[] = []

  ngOnInit(): void {
  }


  onBuy(trip : Wycieczka){
    trip.status = "Incoming"
    if(!this.cartService.boughtTrips.includes(trip)){
      this.cartService.boughtTrips.push(trip)
    }
    trip.boughtTimes += 1
    trip.boughtAt = new Date().toLocaleString()
    this.onDelete(trip)
    console.log(this.cartService.boughtTrips)
  }

  onDelete(trip : Wycieczka){
    for(let i = 0; i < this.cartService.trips.length; i++){
      if(this.cartService.trips[i].id == trip.id){
        
        this.cartService.trips.splice(i,1)
      }
    }
  }

}

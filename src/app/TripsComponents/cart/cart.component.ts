import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Trip } from '../../Interfaces/Trip';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  
  constructor(public cartService : CartService) {
    
  }
  
  ngOnInit(): void {
    this.cartService.tripsReserved.subscribe((trips: any) =>{
      console.log("tripsss",trips)
      this.tripsReserved = trips
    })
  }
    
    tripsReserved: any[] = [] 



  reserveTrip(trip : any){
    this.cartService.addReservation(trip)
  }

  onDelete(trip : Trip){
    this.cartService.removeReservation(trip)
  }


    test(){
      console.log(this.tripsReserved)
    }
}

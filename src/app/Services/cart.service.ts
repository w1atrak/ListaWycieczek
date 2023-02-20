import { Injectable } from '@angular/core';
import { Trip } from '../Interfaces/Trip';
import { DataServiceService } from './data-service.service';
import { AuthService } from './auth.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private dataService: DataServiceService, private authService: AuthService) { 
    this.tripsReserved = this.dataService.db
    .object('/users/'+this.authService.getUser().uid+'/reservedTrips').valueChanges() as Observable<any[]>
   }

  tripsReserved: Observable<any[]>;
  boughtTrips: Trip[] = [];

 

   changeQuantity(trip: any, delta: number){
    console.log(this.authService.getUser().uid,"user")
    this.dataService.db.list('/users/'+this.authService.getUser().uid+'/reservedTrips')
    .snapshotChanges()
    .pipe(first())
    .subscribe(((trips: any) =>{
      for(let t of trips){
        if(t.payload.val().name==trip.name){
          let previousQuant = t.payload.val().quantity

          this.dataService.db.list('/users/'+this.authService.getUser().uid+'/reservedTrips')
          .update(t.key,{quantity: previousQuant+delta})
        }
      }
    }))
   }

   
  addReservation(trip: any){
    this.changeQuantity(trip,1)
  }
  removeReservation(trip: any){
    this.changeQuantity(trip,-1)
  }

}

import { Injectable } from '@angular/core';
import { Trip } from '../Interfaces/Trip';
import { DataServiceService } from './data-service.service';
import { AuthService } from './auth.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  reservedQuantIsZero: boolean = true
  leftSlotsIsZero: boolean = true
  tripsReserved: Observable<any[]>;
  boughtTrips: Trip[] = [];


  constructor(private dataService: DataServiceService, private authService: AuthService) { 
    this.tripsReserved = this.dataService.db
    .list('/users/'+this.authService.getUser().uid+'/reservedTrips').valueChanges() as Observable<any[]>
   }


   changeQuantity(trip: any, delta: number){
    let reservedTripsRef = this.dataService.db.list('/users/'+this.authService.getUser().uid+'/reservedTrips')

    reservedTripsRef
    .snapshotChanges()
    .pipe(first())
    .subscribe(((trips: any) =>{
      let tripFound: boolean = false
      
      for(let t of trips){
        if(t.payload.val().name==trip.name){
          tripFound = true
          let previousQuant = t.payload.val().quantity

          if(previousQuant == 1 && delta == -1) {
            reservedTripsRef.remove(t.key)
            this.reservedQuantIsZero = true
          }
          else{
            reservedTripsRef.update(t.key,{quantity: previousQuant+delta})
            this.reservedQuantIsZero = false
          }
        }
      }

      if(!tripFound && delta==1){
        reservedTripsRef.push({name: trip.name, country: trip.country, startDate: trip.startDate, 
          endDate: trip.endDate, price: trip.price, quantity: 1})
      }
      if(!tripFound && delta == -1)  this.reservedQuantIsZero = true
    }))
   }

   upadteTrip(trip: any, delta: number){
    let tripsRef = this.dataService.db.list('wycieczki')

    tripsRef
    .snapshotChanges()
    .pipe(first())
    .subscribe((trips: any) =>{
      for(let t of trips){
        if(t.payload.val().name==trip.name) {
          let leftSlots = t.payload.val().maxPeople
          this.leftSlotsIsZero = leftSlots == 0
          
          if(this.leftSlotsIsZero && delta == -1) continue
          tripsRef.update(t.key,{maxPeople: leftSlots + delta})
        }
      }
    })

    

   }

   
  async addReservation(trip: any){
    this.upadteTrip(trip, -1)
    if(!this.leftSlotsIsZero)  this.changeQuantity(trip,1)
  }


  removeReservation(trip: any){
    this.changeQuantity(trip,-1)
    if(!this.reservedQuantIsZero)  this.upadteTrip(trip, 1)
  }

  // async canReserve(trip: any) {
  //   let tripsRef = this.dataService.db.list('wycieczki')

  //   tripsRef
  //   .snapshotChanges()
  //   .pipe(first())
  //   .subscribe((trips: any) =>{
  //     for(let t of trips){
  //       if(t.payload.val().name==trip.name) {
  //         return t.payload.val().maxPeople != 0
  //       }
  //     }
  //     return false
  //   })
  // }
  

  
}

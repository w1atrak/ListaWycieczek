import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  wycieczki: Observable<any[]>;
  nextId: number = -1;


  constructor(private db : AngularFireDatabase) { 
    this.wycieczki = this.db.list('wycieczki').valueChanges();
    this.db.list('wycieczki', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})    
 
  }


  getTrips(): Observable<any[]> {
    return this.wycieczki;
  }

  getId(){
    return this.nextId;
  }
  addTrip(trip: any){
    this.db.list('wycieczki').push(trip);
  }

  removeTrip(id: number){
    this.db.list('wycieczki').snapshotChanges().pipe(first()).subscribe((res: any[]) => {
      for (let item of res){
        if(item.payload.val().id == id){
          this.db.list('wycieczki').remove(item.payload.key);
        }
      }
    })

  }

}

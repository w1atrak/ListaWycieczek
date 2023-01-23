import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { User, UserTypes } from './Interfaces/User';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  wycieczki: Observable<any[]>;
  nextId: number = -1;

  users: Observable<any[]>;


  constructor(public db : AngularFireDatabase) { 
    this.wycieczki = this.db.list('wycieczki').valueChanges();
    this.db.list('wycieczki', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})    

    this.users = this.db.list('users').valueChanges();
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

  addUser(user: User){
    this.db.object('users/'+user.id).set({
      email: user.email,
      type : user.type,
      id: user.id
    });
  }

  async getUserType(id: any){
    return firstValueFrom(this.db.object('/users/'+id+'/type').valueChanges());
  }


  getUsers(): Observable<any[]>{
    return this.users
  }

  updateTrip(trip: Wycieczka){
    this.db.list('wycieczki').snapshotChanges().pipe(first()).subscribe((trips: any)=>{
      for(let t of trips){
        if(t.payload.val().id==trip.id){
          this.db.list('wycieczki').update(t.payload.key, trip)
        }
      }
    })
  }


}

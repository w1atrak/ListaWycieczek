import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Wycieczka } from './wycieczki/wycieczki.component';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  wycieczki: Observable<any[]>;
  nextId: number | undefined;

  constructor(private db : AngularFireDatabase) { 
    this.wycieczki = this.db.list('wycieczki').valueChanges();
    this.db.list('wycieczki', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})


  //   const dane: AngularFireList<any> = this.db.list('wycieczki');
  //   dane.snapshotChanges().subscribe(data => {
  //     this.daneRef = data; 
  //   });
  }


  getTrips(): Observable<any[]> {
    return this.wycieczki;
  }
}

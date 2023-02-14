import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Trip } from '../../Interfaces/Trip';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public cartService : CartService) { }


  statuses = ["Incoming", "Active", "Finished"]

  ngOnInit(): void {
    this.getStatus()
  }


  switchStatus(status : string){
    if(this.statuses.includes(status)){
      this.statuses = this.statuses.filter(s => s != status)
    } else {
      this.statuses.push(status)
    }
  }

  getStatus(){
    this.cartService.boughtTrips.forEach(trip => {
      const now = new Date()
      const startDate = new Date(trip.startDate)
      const endDate = new Date(trip.endDate)
      if(startDate <= now && endDate >= now){
        //trip.status = "Active"
      }
      else if(endDate < now){
        //trip.status = "Finished"
      }

    })
  }

}


@Pipe({
  name: 'filterStatusPipe',
  pure: false
})
export class FilterStatusPipe implements PipeTransform {
  transform(trips: Trip[], filter: any): Trip[] {
    return trips.filter(trip => {
      // return filter.includes(trip.status)
    })
  }
}

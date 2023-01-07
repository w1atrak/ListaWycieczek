import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';
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
  }


}


@Pipe({
  name: 'filterStatusPipe',
  pure: false
})
export class FilterStatusPipe implements PipeTransform {
  transform(trips: Wycieczka[], filter: any): Wycieczka[] {
    return trips.filter(trip => {
      return filter.includes(trip.status)
    })
  }
}

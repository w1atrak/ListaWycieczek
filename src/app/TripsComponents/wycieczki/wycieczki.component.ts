import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { DataServiceService } from '../../Services/data-service.service';
import { CartService } from '../../Services/cart.service';
import { AuthService } from '../../Services/auth.service';
import { Trip } from '../../Interfaces/Trip';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})




export class WycieczkiComponent implements OnInit, AfterContentChecked {

  constructor( private dataService: DataServiceService, private ref: ChangeDetectorRef,
    public cartService: CartService, public authService: AuthService) {
  }





  trips: Trip[] = [];

  reserved: number = 0
  maxPrice: number = 0
  minPrice: number = 10 ** 10
  attributes: any[] = []
  showFilters = false



  




  ngOnInit(): void {
    
    this.dataService.getTrips().subscribe(trips => {
      this.trips = []
      for (let trip of trips) {
        this.trips.push({
          id: trip.id,
          name: trip.name,
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          price: trip.price,
          maxPeople: trip.maxPeople,
          currency: trip.currency,
          description: trip.description,
          ratings: trip.ratings,
          image: trip.image,
          hidden: false,
        } as Trip)
      }
    })
    
    this.refresh()  // :()

  }


  showFiltersF() {
    this.refresh()
    return this.showFilters
  }


  updatePrices() {
    this.maxPrice = 0
    this.minPrice = 10 ** 10
    this.trips.forEach((wycieczka: any) => {
      if (!wycieczka.hidden) {
        this.maxPrice = Math.max(wycieczka.price, this.maxPrice)
        this.minPrice = Math.min(wycieczka.price, this.minPrice)
      }
    })
  }



  addReservation(item: any) {
    item.reserved += 1
    item.maxPeople -= 1
    this.reserved += 1
    this.cartService.trips.push(item)
  }

  removeReservation(item: any) {
    item.reserved -= 1
    item.maxPeople += 1
    this.reserved -= 1
  }

  getColor(index: number) {
    return 'rgba(185,85,85,' + String(index) + ')'
  }


  

  ocena(reviews: any[]) {
    var sum: number = 0
    reviews.forEach((review: any) => {
      sum += parseInt(review, 10)
    })
    return Math.floor(sum / reviews.length)
  }


  setAttributes() { // lokalizacja cena data ocena
    let lokalizacje: string[] = []
    let dataMin: any
    let dataMax: any
    let ocenaMin: number = 6
    let ocenaMax: number = 0
    let minPrice: number = 10 ** 10
    let maxPrice: number = 0

    this.trips.forEach((wycieczka: any) => {
      if (true) {
        if (!lokalizacje.includes(wycieczka.country)) {
          lokalizacje.push(wycieczka.country)
        }

        if (wycieczka.startDate < dataMin || dataMin == undefined) {
          dataMin = wycieczka.startDate
        }
        if (wycieczka.endDate > dataMax || dataMax == undefined) {
          dataMax = wycieczka.endDate
        }
        if (wycieczka.reviews.length > 0) {
          ocenaMax = Math.max(this.ocena(wycieczka.reviews), ocenaMax)
          ocenaMin = Math.min(this.ocena(wycieczka.reviews), ocenaMin)
        }
        maxPrice = Math.max(wycieczka.price, maxPrice)
        minPrice = Math.min(wycieczka.price, minPrice)
        
      }

    })
    this.updatePrices()
    this.attributes.push(lokalizacje)
    this.attributes.push([minPrice, maxPrice])
    this.attributes.push([dataMin, dataMax])
    this.attributes.push([])

    for (let i = ocenaMin; i <= ocenaMax; i++) {
      this.attributes[3].push(i)
    }
    this.showFilters = !this.showFilters
  }


  getWycieczki() {
    return this.trips
  }


  refresh() {
    this.updatePrices()
    this.trips.push()
    this.trips.unshift()

  }
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

}

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(trips: Trip[], filter: any): Trip[] {
    if (filter.length == 0) {
      return trips
    }
    return trips.filter((item: Trip) => {
      var sum: number = 0
      item.ratings.forEach((review: any) => {
        sum += parseInt(review, 10)
      })
      let rev = Math.floor(sum / item.ratings.length)

      let result = filter[0].includes(item.country) && item.price >= filter[1][0] && item.price <= filter[1][1] && item.startDate >= filter[2][0] && item.endDate <= filter[2][1] && filter[3].includes(rev)
      item.hidden = !result
      return result
    });
  }

}







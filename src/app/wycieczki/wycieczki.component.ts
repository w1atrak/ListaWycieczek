import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from '@firebase/util';
import { DataServiceService } from '../data-service.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})




export class WycieczkiComponent implements OnInit, AfterContentChecked {

  constructor(private formBuilder: FormBuilder, private dataService: DataServiceService, private ref: ChangeDetectorRef,
    private cartService: CartService) {
  }





  wycieczki: Wycieczka[] = [];

  reserved: number = 0
  maxPrice: number = 0
  minPrice: number = 10 ** 10
  attributes: any[] = []
  showFilters = false






  ngOnInit(): void {

    this.dataService.getTrips().subscribe(trips => {
      this.wycieczki = []
      for (let trip of trips) {
        this.wycieczki.push({
          id: trip.id,
          name: trip.name,
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          price: trip.price,
          maxPeople: trip.maxPeople,
          currency: trip.currency,
          description: trip.description,
          rating: trip.reviews,
          image: trip.image,
          reserved: 0,
          hidden: false,
          boughtTimes: 0,
          status: null
        } as Wycieczka)
      }
    })

  }



  updatePrices() {
    this.maxPrice = 0
    this.minPrice = 10 ** 10
    this.wycieczki.forEach((wycieczka: any) => {
      if (!wycieczka.removed) {
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


  remove(item: any) {
    this.reserved -= item.reserved
    item.hidden = true
    item.removed = true
    this.updatePrices()
    this.refresh()

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

    this.wycieczki.forEach((wycieczka: any) => {
      if (!wycieczka.removed) {
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
      }

    })
    this.attributes.push(lokalizacje)
    this.attributes.push([this.minPrice, this.maxPrice])
    this.attributes.push([dataMin, dataMax])
    this.attributes.push([])

    for (let i = ocenaMin; i <= ocenaMax; i++) {
      this.attributes[3].push(i)
    }
    this.showFilters = !this.showFilters
  }


  getWycieczki() {
    return this.wycieczki
  }


  refresh() {
    this.updatePrices()
    this.wycieczki.push()
    this.wycieczki.unshift()

  }
  ngAfterContentChecked() {
    this.ref.detectChanges();

  }

}
//TODO rozróżnić removed od hidden 

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(wycieczki: Wycieczka[], filter: any): Wycieczka[] {
    if (filter.length == 0) {
      return wycieczki
    }
    return wycieczki.filter((item: Wycieczka) => {
      var sum: number = 0
      item.rating.forEach((review: any) => {
        sum += parseInt(review, 10)
      })
      let rev = Math.floor(sum / item.rating.length)

      let result = filter[0].includes(item.country) && item.price >= filter[1][0] && item.price <= filter[1][1] && item.startDate >= filter[2][0] && item.endDate <= filter[2][1] && filter[3].includes(rev)
      item.hidden = !result
      return result
    });
  }

}





export interface Wycieczka {
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  maxPeople: number;
  description: string;
  image: string;
  reserved: number;
  hidden: boolean;
  rating: any[];
  boughtTimes: number;
  status: any;
}


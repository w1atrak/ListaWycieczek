import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtrowanie-wycieczek',
  templateUrl: './filtrowanie-wycieczek.component.html',
  styleUrls: ['./filtrowanie-wycieczek.component.css']
})
export class FiltrowanieWycieczekComponent implements OnInit {

  @Input() filterValues: any[] = [];
  @Output() filterValuesChange = new EventEmitter<any[]>();

  filtered : any[] = []

  countries: any
  minPrice: any
  maxPrice: any
  minDate : any
  maxDate : any
  minReview : any
  maxReview : any
  reviews: any[] = []
  reviews2: any[] = []


  constructor() { }

  ngOnInit(): void {
    this.countries = this.filterValues[0]
    this.minPrice = this.filterValues[1][0]
    this.maxPrice = this.filterValues[1][1]
    this.minDate = this.filterValues[2][0]
    this.maxDate = this.filterValues[2][1]
    this.minReview = this.filterValues[3][0]
    this.maxReview = this.filterValues[3][1]

    this.filtered.push([])
    this.countries.forEach((country : any) => {
      this.filtered[0].push(country)
    })
    this.filtered.push([this.minPrice, this.maxPrice])
    this.filtered.push([this.minDate, this.maxDate])
    this.filtered.push([])


    this.filterValues[3].forEach((review : any) => {
      if(this.reviews.includes(review)) return
      this.reviews.push(review)
      this.reviews2.push(review)
    })

    // for(let i = this.minReview; i <= this.maxReview; i++){
    //   this.reviews.push(i)
    //   this.reviews2.push(i)
    //   this.filtered[3].push(i)
    // }

    console.log(this.filterValues)
  }

  click(){
    this.filtered[3] = []
    this.reviews.forEach((review : any) => {
      this.filtered[3].push(review)
    })
    console.log(this.filtered)


    this.filterValuesChange.emit(this.filtered)
  }


  changeCountry(country : any){
    if(this.filtered[0].includes(country)){
      let index = this.filtered[0].indexOf(country)
      this.filtered[0].splice(index, 1)
    }
    else{
      this.filtered[0].push(country)
    }
    this.click()
  }

  changeReview(ocena: any){
    if(this.reviews.includes(ocena)){
      let index = this.reviews.indexOf(ocena)
      this.reviews.splice(index, 1)
    }
    else{
      this.reviews.push(ocena)
    }
    this.click()
  }
}


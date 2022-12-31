import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ocena-wycieczki',
  templateUrl: './ocena-wycieczki.component.html',
  styleUrls: ['./ocena-wycieczki.component.css']
})
export class OcenaWycieczkiComponent implements OnInit {

  @Input() reviews: any = []
  @Output() reviewsChange = new EventEmitter<any>();

  review: number = 0
  show = false
  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.show = !this.show
  }

  onChoose() {
    this.reviews.push(this.review)
    this.reviewsChange.emit(this.reviews)
    this.show = false
    
  }

}

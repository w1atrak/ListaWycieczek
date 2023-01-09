import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.css']
})
export class TripReviewComponent implements OnInit {

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
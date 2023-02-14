import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../Services/data-service.service';
import { Trip } from '../../Interfaces/Trip';


@Component({
  selector: 'app-ocena-wycieczki',
  templateUrl: './ocena-wycieczki.component.html',
  styleUrls: ['./ocena-wycieczki.component.css']
})
export class OcenaWycieczkiComponent implements OnInit {


  constructor(private formBuilder : FormBuilder,    private route: ActivatedRoute, private dataService: DataServiceService) { }

  trips: Trip[] = [];
  reviews : any[] = [];
  id: number = 0;

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      trip: ['', Validators.required],
      review: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    })
    this.modelForm.valueChanges.subscribe(data => this.onControlValueChanged());
    

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.dataService.getTrips().subscribe(data => {
        for(let wycieczka of data){
          if(wycieczka.id == this.id){
            this.trips.push({
              id: wycieczka.id,
              name: wycieczka.name,
              country: wycieczka.country,
              startDate: wycieczka.startDate,
              endDate: wycieczka.endDate,
              price: wycieczka.price,
              maxPeople: wycieczka.maxPeople,
              currency: wycieczka.currency,
              description: wycieczka.description,
              ratings: wycieczka.ratings,
              image: wycieczka.image,
              hidden: false,
            } as Trip)
          }

        }
      
      })});

  
  
  
  }














  // review  handling section


  modelForm: FormGroup = new FormGroup({});

  formErrors: any = {
    nickname: '',
    trip: '',
    review: '',
  };
  validationMessages : any= {
    nickname: {
      required: 'Nickname is required.'
    },
    trip: {
      required: 'Trip name is required.'
    },
    review: {
      required: 'Review is required.',
      minlength: 'Review must be at least 50 characters long.',
      maxlength: 'Review cannot be more than 500 characters long.'
    }
  };
  onControlValueChanged() {
    const form = this.modelForm;
  
    for (let field in this.formErrors) {
      this.formErrors[field as keyof any] = '';
      let control = form.get(field); 
  
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field as keyof any];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }


  onSubmit(modelForm : any) {
    console.log(this.modelForm.value)
    let review : Review = {
      nickname: modelForm.value.nickname,
      trip: modelForm.value.trip,
      review: modelForm.value.review,
      date: modelForm.value.date
    }
    this.reviews.push(review);
    this.modelForm.reset();
    console.log(this.reviews)
  }


}

interface Review {
  nickname: string;
  trip: string;
  review: string;
  date: string
}
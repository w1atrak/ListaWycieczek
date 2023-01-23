import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.css']
})
export class ModifyTripComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private dataService : DataServiceService) { }

  @Input() trip: any

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: [this.trip.name, Validators.required],
      country: [this.trip.country, [Validators.required, Validators.pattern('[A-Z][a-z]+')]],
      startDate: [this.trip.startDate, Validators.required],
      endDate: [this.trip.endDate, [Validators.required, this.validateDates]],
      price: [this.trip.price,  [Validators.pattern('[0-9]+'), Validators.required]],
      maxPeople: [this.trip.maxPeople, [Validators.required, Validators.pattern('[0-9]+')]],
      description: [this.trip.description, Validators.required],
      image: [this.trip.image, Validators.required]
    })
    this.modelForm.valueChanges.subscribe(data => this.onControlValueChanged());
  }

  modelForm: FormGroup = new FormGroup({});

  clear(){
    this.trip = null
  }






  validateDates = (control: AbstractControl): {[key: string]: any} | null => {
    const startDate = this.modelForm?.get('startDate')?.value as string;
    const endDate = this.modelForm?.get('endDate')?.value as string;
  
    if (startDate > endDate) {  
      console.log("valid")
      return {validDates: true};
    }
  
    return null;
  };
  formErrors: any = {
    name: '',
    country: '',
    startDate: '',
    endDate: '',
    price: '',
    maxPeople: '',
    description: '',
    image: ''
  };
  validationMessages : any= {
    name: {
      required: 'Name is required.'
    },
    country: {
      required: 'Country is required.',
      pattern: 'Country must start with capital letter.'
    },
    startDate: {
      required: 'Start date is required.'
    },
    endDate: {
      required: 'End date is required.',
      validDates: 'End date must be after start date.'
    },
    price: {
      pattern: 'Price must be a number.'
    },
    maxPeople: {
      required: 'Max people is required.',
      pattern: 'Max people must be a number.'
    },
    description: {
      required: 'Description is required.'
    },
    image: {
      required: 'Image is required.'
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


  onSubmit(form:any) {
    let wycieczka : Wycieczka= {
      id: this.trip.id,
      name: this.modelForm.value.name,
      country: this.modelForm.value.country,
      startDate: this.modelForm.value.startDate,
      endDate: this.modelForm.value.endDate,
      price: this.modelForm.value.price,
      currency: 'USD',
      maxPeople: this.modelForm.value.maxPeople,
      description: this.modelForm.value.description,
      image: this.modelForm.value.image,
      reserved: 0,
      hidden: false,
      rating: [] = [],
      boughtTimes: 0,
      status: null,
      boughtAt: '',
      reviews: [],
  
    }
    wycieczka.rating.push([2])   /// domyślne

    this.modelForm.reset()
    this.trip = null

    this.dataService.updateTrip(wycieczka)

  }
}

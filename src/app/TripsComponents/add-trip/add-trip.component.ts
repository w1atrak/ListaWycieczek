import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataServiceService } from '../../Services/data-service.service';
import { Trip } from '../../Interfaces/Trip';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private dataService : DataServiceService) { }

  trips: Trip[] = []
  ngOnInit(): void {
    
    this.dataService.getTrips().subscribe(trips=>{
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


    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern('[A-Z][a-z]+')]],
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.validateDates]],
      price: ['',  [Validators.pattern('[0-9]+'), Validators.required]],
      currency: ['', [Validators.required, Validators.maxLength(5)]],
      maxPeople: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    })
    this.modelForm.valueChanges.subscribe(data => this.onControlValueChanged());
  }


  modelForm: FormGroup = new FormGroup({});
  modifying: boolean = false
  choosenTrip: any

  remove(item: any) {
    this.dataService.removeTrip(item.id)
  }

  modify(trip: any){
    this.choosenTrip = trip
    this.modifying = true
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
    currency: '',
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
    currency: {
      required: 'Currency is required.',
      maxLength: 'Currency must be 5 characters long.'
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
    let wycieczka : Trip= {
      id: this.dataService.getId(),
      name: this.modelForm.value.name,
      country: this.modelForm.value.country,
      startDate: this.modelForm.value.startDate,
      endDate: this.modelForm.value.endDate,
      price: this.modelForm.value.price,
      currency: this.modelForm.value.currency,
      maxPeople: this.modelForm.value.maxPeople,
      description: this.modelForm.value.description,
      image: this.modelForm.value.image,
      hidden: false,
      ratings: [] = [],
  
    }
    wycieczka.ratings.push([2])   /// domy??lne

    this.modelForm.reset()

    this.dataService.addTrip(wycieczka)

    
  }


}

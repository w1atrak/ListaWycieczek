import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})




export class WycieczkiComponent implements OnInit, AfterContentChecked {

  public daneRef: Observable<any>[];
  dane: any
  constructor(private formBuilder : FormBuilder, private db: AngularFireDatabase, private ref :ChangeDetectorRef) { 
    const dane: AngularFireList<any> = db.list('wycieczki');
    dane.valueChanges().subscribe(data => {
      this.daneRef = data;
      this.wycieczki = this.daneRef as unknown as Wycieczka[];
    });
    this.dane = dane;
  }

  
  


  wycieczki: Wycieczka[] = [];
  reserved : number = 0
  maxPrice : number = 0
  minPrice : number = 10**10
  attributes: any[] = []
  showFilters = false

  showAdding: boolean = false;

  
  modelForm: FormGroup = new FormGroup({});

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
    let wycieczka : Wycieczka= {
      name: this.modelForm.value.name,
      country: this.modelForm.value.country,
      startDate: this.modelForm.value.startDate,
      endDate: this.modelForm.value.endDate,
      price: this.modelForm.value.price,
      currency: this.modelForm.value.currency,
      maxPeople: this.modelForm.value.maxPeople,
      description: this.modelForm.value.description,
      image: this.modelForm.value.image,
      reserved: 0,
      removed: false,
      hidden: false,
      reviews: [] = []

    }
    wycieczka.reviews.push([2])   /// domyślne

    this.wycieczki.push(wycieczka)
    this.dane.push(wycieczka)
    this.showAdding = false /////////////////////////////////////////////////////////////////////////
    this.maxPrice = Math.max(wycieczka.price, this.maxPrice)
    this.minPrice = Math.min(wycieczka.price, this.minPrice) 
    this.modelForm.reset()
  }

  addingClicked(){
    this.showAdding = !this.showAdding
  }

  updatePrices(){
    this.maxPrice = 0
    this.minPrice = 10**10
    this.wycieczki.forEach((wycieczka: any) => {
      if(!wycieczka.removed){
        this.maxPrice = Math.max(wycieczka.price, this.maxPrice)
        this.minPrice = Math.min(wycieczka.price, this.minPrice) 
      }
    })
  }

  ngOnInit(): void {
    console.log(this.daneRef, "no i co tam mamy")


    fetch('../assets/wycieczki.json').then(res => res.json())
    .then(data => {
      let wycieczki : Wycieczka[] = data
      Object.keys(wycieczki).forEach((key : any) => {
        wycieczki[key].reserved = 0
        wycieczki[key].removed = false
        wycieczki[key].hidden = false
        this.wycieczki.push(wycieczki[key] as Wycieczka)

        this.maxPrice = Math.max(wycieczki[key].price, this.maxPrice)
        this.minPrice = Math.min(wycieczki[key].price, this.minPrice) 
      })
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
    this.onControlValueChanged();
  
  }

  addReservation(item: any){
    item.reserved += 1
    item.maxPeople -= 1
    this.reserved += 1
  }

  removeReservation(item: any){
    item.reserved -= 1
    item.maxPeople += 1
    this.reserved -= 1
  }

  getColor(index: number){
    return 'rgba(185,85,85,' + String(index) + ')'
  }


  remove(item: any){
    this.reserved -= item.reserved
    item.hidden = true
    item.removed = true
    this.updatePrices()
    this.refresh()

  }

  ocena(reviews: any[]){
    var sum : number = 0
    reviews.forEach((review: any) => {
      sum += parseInt(review,10)
    })
    return Math.floor(sum/reviews.length) 
  }


  setAttributes(){ // lokalizacja cena data ocena
    let lokalizacje : string[] = []
    let dataMin : any
    let dataMax : any
    let ocenaMin : number = 6
    let ocenaMax : number = 0

    this.wycieczki.forEach((wycieczka: any) => {
      if(!wycieczka.removed){
        if(!lokalizacje.includes(wycieczka.country)){
          lokalizacje.push(wycieczka.country)
        }

        if(wycieczka.startDate < dataMin || dataMin == undefined){
          dataMin = wycieczka.startDate
        }
        if(wycieczka.endDate > dataMax || dataMax == undefined){
          dataMax = wycieczka.endDate
        }
        if(wycieczka.reviews.length > 0){
          ocenaMax = Math.max(this.ocena(wycieczka.reviews), ocenaMax)
          ocenaMin = Math.min(this.ocena(wycieczka.reviews), ocenaMin)
        }
      }
    
    })
    this.attributes.push(lokalizacje)
    this.attributes.push([this.minPrice, this.maxPrice])
    this.attributes.push([dataMin, dataMax])
    this.attributes.push([])

    for(let i = ocenaMin; i <= ocenaMax; i++){
      this.attributes[3].push(i) 
    }
    this.showFilters = !this.showFilters
  }


  getWycieczki(){
    return this.wycieczki
  }


  refresh(){
    this.updatePrices()
    this.wycieczki.push()
    this.wycieczki.unshift()
    
  }
  ngAfterContentChecked() {
    this.ref.detectChanges();

}

}
//TODO rozróżnić removed od hidden 

@Pipe({ name: 'filterPipe',
pure: false })
export class FilterPipe implements PipeTransform {
  transform(wycieczki: Wycieczka[], filter: any): Wycieczka[] {
    if(filter.length == 0){
      return wycieczki
    }
    return wycieczki.filter((item: Wycieczka) => {
      var sum : number = 0
    item.reviews.forEach((review: any) => {
      sum += parseInt(review,10)
    })
    let rev = Math.floor(sum/item.reviews.length)

      let result = filter[0].includes(item.country) && item.price >= filter[1][0] && item.price <= filter[1][1] && item.startDate >= filter[2][0] && item.endDate <= filter[2][1] && filter[3].includes(rev)
      item.hidden = !result
      return result
    });
  }

}





export interface Wycieczka {
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
  removed: boolean;
  hidden: boolean;
  reviews: any[];
}


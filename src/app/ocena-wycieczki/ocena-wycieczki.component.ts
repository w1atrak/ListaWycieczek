import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ocena-wycieczki',
  templateUrl: './ocena-wycieczki.component.html',
  styleUrls: ['./ocena-wycieczki.component.css']
})
export class OcenaWycieczkiComponent implements OnInit {


  constructor(private formBuilder : FormBuilder){
    
   }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      trip: ['', Validators.required],
      review: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    })
    this.modelForm.valueChanges.subscribe(data => this.onControlValueChanged());
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
  }


}

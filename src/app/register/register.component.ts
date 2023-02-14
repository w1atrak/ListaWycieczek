import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }


  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  SubmitUser() {
    if(!this.loginForm.valid){
      this.showErrorMessage = true;
      return;
    }
    this.showErrorMessage = false;
    this.authService.createUser(this.loginForm.value.login, this.loginForm.value.password);
    this.loginForm.reset();

    this.router.navigate(['/home']);
  }
}

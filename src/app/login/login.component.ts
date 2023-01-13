import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


  Login() {
    if(!this.loginForm.valid){
      this.showErrorMessage = true;
      return;
    }
    this.showErrorMessage = false;
    console.log( this.authService.login(this.loginForm.value.login, this.loginForm.value.password));
    this.loginForm.reset();

    this.router.navigate(['/home']);
  }
}

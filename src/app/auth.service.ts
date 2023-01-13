import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from './Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.angularFireAuth.authState.subscribe( async (state) => {
      if(state){
        this.userData = state;
      }
      else{
        this.userData = null;
      }
    })
  }

  createUser(email: string, password: string) {
    return this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then( (userData) => {
      let user = new User(userData);
      console.log(user)
    })
    .catch( (error) => {
      window.alert(error.message)
    })
  }

  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  getUser(){
    return this.userData;
  }
}

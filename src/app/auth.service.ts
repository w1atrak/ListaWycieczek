import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User, UserTypes } from './Interfaces/User';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null;
  userType: UserTypes | undefined  = {
    guest: true,
    user: false,
    admin: false,
    manager: false
  };

  constructor(public angularFireAuth: AngularFireAuth, private dataService: DataServiceService) { 
    this.angularFireAuth.authState.subscribe( async (state) => {
      if(state){
        this.userData = state;
        const user = await this.dataService.getUser(state.uid);
        this.userType = user as UserTypes;
        console.log(user)
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
      let user = new User(userData.user);
      console.log(user);
      this.dataService.addUser(user);
    })
    .catch( (error) => {
      window.alert(error.message)
    })
  }


  login(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    console.log(this.userData)
    this.angularFireAuth.signOut();
  }

  getUser(){
    return this.userData;
  }

  isLoggedIn(){
    return this.userData !== null;
  }
}

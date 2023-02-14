import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User, UserTypes } from '../Interfaces/User';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null;
  userType: UserTypes   = {
    guest: true,
    user: false,
    admin: false,
    manager: false,
    banned: false
  };

  currentPersistance: string = 'local'

  constructor(public angularFireAuth: AngularFireAuth, private dataService: DataServiceService) { 
    // place that setting in a database
    this.angularFireAuth.setPersistence(this.currentPersistance)
    this.angularFireAuth.authState.subscribe( async (state) => {
      if(state){
        this.userData = state;
        const user = await this.dataService.getUserType(state.uid);
        this.userType = user as UserTypes;
      }
      else{
        this.userData = null;
        this.userType = {
          guest: true,
          admin: false,
          manager: false,
          banned: false,
          user: false
        }
      }
    })
  }

  createUser(email: string, password: string) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then( (userData) => {
      let user = new User(userData.user);
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
    this.userType = {
      guest: true,
      admin: false,
      manager: false,
      banned: false,
      user: false
    }
    this.angularFireAuth.signOut();
  }

  getUser(){
    return this.userData;
  }

  async getUserType(){
    let res = await this.dataService.getUserType(this.userData.uid)
    return res
  }

  isLoggedIn(){
    return this.userData !== null;
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataServiceService } from '../data-service.service';
import { map } from 'rxjs/operators';
import { UserTypes } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private dataService: DataServiceService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let path = route.url[0].path

      return this.authService.angularFireAuth.authState.pipe(map(state=>{

        if(state){
          let type: UserTypes
          this.authService.getUserType()
            .then((res)=>{
              type = res as UserTypes
            }
            )
            .then(
              ()=>{
                if(path=='admin-panel' && !type.admin) return this.handleFalse()
                if(path=='add-trip' && !type.manager) return this.handleFalse()
                if(path=='trip' && !type.user) return this.handleFalse()

                return true
              }
            )
            .catch((e)=>console.log(e.message))

          

          return true;
        }
        else{
          return this.handleFalse();
        }
      }))


  }

  handleFalse(){
    this.router.navigate(['/home']);
    return false;
  }
  
}

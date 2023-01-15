import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataServiceService } from '../data-service.service';
import { map } from 'rxjs/operators';

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

          if(path=='admin-panel'){
            console.log(this.authService.userType)

          }

          return true;
        }

        return this.handleFalse();
      }))


  }

  handleFalse(){
    this.router.navigate(['/home']);
    return false;
  }
  
}

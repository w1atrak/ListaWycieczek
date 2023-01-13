import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService : AuthService) { }

  hamburgerMenu: boolean = true;
  smallScreen: boolean = true;
  hamburgerText: string = "menu";



  ngOnInit(): void {
  }

  changeHamburger() {
    this.hamburgerMenu = !this.hamburgerMenu;
    this.hamburgerText = this.hamburgerMenu ? "close" : "menu";
  }

  onResize(event: any) {
    if (event.target.innerWidth > 730) {
      this.hamburgerMenu = false;
      this.changeHamburger();
    }
    else{
      this.hamburgerMenu = true;
      this.changeHamburger();
    }
    this.smallScreen = event.target.innerWidth < 730;
  }

  logout() {
    this.authService.logout();
  }
  getUsername(){
    return this.authService.getUser().email
  }

}

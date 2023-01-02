import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  hamburgerMenu: boolean = true;
  hamburgerText: string = "menu";


  ngOnInit(): void {
  }

  changeHamburger() {
    this.hamburgerMenu = !this.hamburgerMenu;
    this.hamburgerText = this.hamburgerMenu ? "close" : "menu";
  }

  onResize(event: any) {
    if (event.target.innerWidth > 690) {
      this.hamburgerMenu = true;
      this.hamburgerText = "close";
    }
  }

}

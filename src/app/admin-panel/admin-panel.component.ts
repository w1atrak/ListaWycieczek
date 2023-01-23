import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public authService: AuthService) { }

 
  ngOnInit(): void {
  }

  setPersistance(persistance: string){
    this.authService.angularFireAuth.setPersistence(persistance)
    this.authService.currentPersistance = persistance
    console.log('wywolany')
  }

}

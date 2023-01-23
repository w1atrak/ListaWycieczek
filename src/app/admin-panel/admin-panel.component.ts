import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataServiceService } from '../data-service.service';
import { User } from '../Interfaces/User';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public authService: AuthService, private dataService: DataServiceService) { }
  users: User[] = []
 
  ngOnInit(): void {
    this.dataService.getUsers().subscribe(users =>{
        this.users = []
        for(let user of users){
          this.users.push({
            email: user.email,
            type: user.type,
            id: user.id
          } as User)
        }
      })
    }

  setPersistance(persistance: string){
    this.authService.angularFireAuth.setPersistence(persistance)
    this.authService.currentPersistance = persistance
  }

  switchRole(id: string, role: string){
    this.users.forEach(user=>{
      if(user.id==id){
        if(role=='admin') user.type.admin = !user.type.admin
        if(role=='manager') user.type.manager = !user.type.manager
        if(role=='banned') user.type.banned = !user.type.banned
        this.dataService.db.list('users').set(user.id,user)
        this.authService.userType = user.type
      }
    })
  }


}

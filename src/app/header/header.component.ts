import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe(response => {
      this.isAuthenticated = response
    })
    
    this.authService.getAuthStatusListener().subscribe(response =>{
       this.isAuthenticated = response
      console.log(this.isAuthenticated)
      })
    
  }
  
  changeAuthorizationMode(value: string){
    this.authService.authorizationMode.next(value);
  }

  logOut(){
    this.isAuthenticated = false;
    this.authService.logout();
  }
}

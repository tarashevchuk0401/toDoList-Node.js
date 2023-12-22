import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAuthenticated: boolean = false;
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe(response => {
      this.isAuthenticated = response;
    });

    this.authService.getAuthStatusListener().subscribe(response => {
      this.isAuthenticated = response;
    });
  }

  logout() {
    this.authService.logout();
    
  }



}

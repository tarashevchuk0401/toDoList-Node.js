import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  changeAuthorizationMode(value: string){
    this.authService.authorizationMode.next(value);
  }
}

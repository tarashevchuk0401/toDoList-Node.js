import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  authMode: string = '';

  constructor(
    private authServise: AuthService,
  ) { }

  ngOnInit(): void {
    this.authServise.authorizationMode.subscribe((data: string) => {
      this.authMode = data;
    });
  }

  changeAuthMode(value: string): void{
    this.authServise.authorizationMode.next(value);
  }

  onSubmit(authForm: NgForm): void {
    if(this.authMode === 'signup'){
      this.signUp(authForm);
    } else if(this.authMode === 'login'){
      this.logIn(authForm);
    }
  }
  
  signUp(authForm: NgForm): void{
    const newUser: User = {
      id: '',
      email: authForm.value.email,
      password: authForm.value.password,
      name: authForm.value.name,
    };
  
    this.authServise.signup(newUser);
  }

  logIn(authForm: NgForm){
      this.authServise.login(authForm.value.email, authForm.value.password);
  }
}

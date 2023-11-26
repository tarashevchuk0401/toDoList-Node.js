import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authServise: AuthService){}

  onSubmit(signUpForm: NgForm){
    const newUser: User = {
      id: '',
      email: signUpForm.value.email,
      password: signUpForm.value.password,
      name: signUpForm.value.name,
    }
    
    console.log(newUser)
    this.authServise.signup(newUser).subscribe()
  }
}

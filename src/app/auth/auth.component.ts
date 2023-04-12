import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  error: string | null = null;
  user = {
    image: '',
    age: null,
    gender: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userName = form.value.userName;
    const email = form.value.email;
    const password = form.value.password;
    const image = form.value.image
    const age = form.value.age
    const gender = form.value.gender
    
    let authObs : Observable<AuthResponseData | any>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs =  this.authService.signup(userName, email, password, image, age, gender)
    }

    authObs.subscribe(
        (resData) => {
        //   console.log(resData);
          this.router.navigate(['/contacts/admin'])
          localStorage.setItem('token', 'Bearer ' + resData.token)
        },
        (error) => {
          this.error = error;
        }
      );
    form.reset();
  }
}

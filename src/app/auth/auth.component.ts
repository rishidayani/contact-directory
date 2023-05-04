import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
// import { GoogleApiService } from '../services/google-api.service';
// import { UserInfo } from 'angular-oauth2-oidc';
// import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

// import { gapi } from 'gapi-script';

export interface User {
  getName(): string;
  getEmail(): string;
  getPhotoUrl(): string;
  getIdToken(): string;
  getAuthResponse(): string;
}

declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  error: string | null = null;
  user: any = {
    password: '',
    image: '',
    age: 0,
    gender: 'male',
  };
  public decodedToken: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id:
            '877272810140-p9m45jqdf7d1lnc2rd5tr9ovtq3ti2j3.apps.googleusercontent.com',
          callback: this.handleCredentialResponse,
        });
        google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
          theme: 'outline',
          size: 'large',
        });
        google.accounts.id.prompt();
      }
    }, 1000);
  }

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
    const image = form.value.image;
    const age = form.value.age;
    const gender = form.value.gender;

    let authObs: Observable<AuthResponseData | any>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(
        userName,
        email,
        password,
        image,
        age,
        gender
      );
    }

    authObs.subscribe(
      (resData) => {
        this.router.navigate(['/contacts/admin']);
        localStorage.setItem('token', 'Bearer ' + resData.token);
      },
      (error) => {
        this.toaster.error(error);
      }
    );
    form.reset();
  }

  handleCredentialResponse = (response: any) => {
    // console.log(response);

    const idToken = response.credential;
    localStorage.setItem('gToken', idToken);
    this.decodedToken = jwt_decode(idToken);
    // console.log(this.decodedToken);

    this.authService
      .gAuthenticate({ decoded: this.decodedToken, idToken })
      .subscribe((res: any) => {
        this.router.navigate(['/contacts/admin']);
        localStorage.setItem('token', 'Bearer ' + res.token);
      });
  };

  // decodeJwtResponse(response : any) {
  //   const idToken = response.credential;
  //   const decodedToken = jwt_decode(idToken);

  //   const user = {
  //     id: decodedToken.sub,
  //     name: decodedToken.name,
  //     email: decodedToken.email,
  //     picture: decodedToken.picture,
  //     // add any additional fields you need
  //   };

  //   return user;
  // }

  // window.onload = function () {
  //   google.accounts.id.initialize({
  //     client_id: "877272810140-p9m45jqdf7d1lnc2rd5tr9ovtq3ti2j3.apps.googleusercontent.com",
  //     callback: handleCredentialResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     { theme: "outline", size: "large" }  // customization attributes
  //   );
  //   google.accounts.id.prompt(); // also display the One Tap dialog
  // }

  // onSignIn(googleUser: { getAuthResponse: any }) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   fetch('http://localhost:3000/gauthenticate?id_token=' + id_token)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       localStorage.setItem('authToken', data.token);
  //     });
  //   // var profile = googleUser.getBasicProfile();
  //   // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   // console.log('Name: ' + profile.getName());
  //   // console.log('Image URL: ' + profile.getImageUrl());
  //   // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  //  handleCredentialResponse(response: gapi.auth2.AuthResponse): void {
  //   // Check if the user is authenticated
  //   if (response && response.access_token) {
  //     // Get the user's access token
  //     const accessToken: string = response.access_token;

  //     // Use the access token to make requests to the Google API
  //     // For example, to retrieve the user's profile information
  //     gapi.client.request({
  //       path: 'https://www.googleapis.com/oauth2/v1/userinfo',
  //       params: { access_token: accessToken },
  //       callback: (data: any, error: any) => {
  //         if (error) {
  //           console.error('Error retrieving user data:', error);
  //           return;
  //         }

  //         const userData: GoogleUser = data;

  //         // Log the user's profile information to the console
  //         console.log('User data:', userData);
  //       }
  //     });
  //   } else {
  //     // Handle the case where the user is not authenticated
  //     console.log('User not authenticated.');
  //   }
  // }

  // onSignIn() {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signIn().then((googleUser: any) => {
  //     const idToken = googleUser.getAuthResponse().id_token;
  //     // Send the token to your server for verification
  //   });
  // }

  // onSignIn(): void {
  //   this.googleApi.signIn().then(
  //     (      user: { getName: () => string; getEmail: () => string; getPhotoUrl: () => string; getIdToken: () => string; getAuthResponse: () => string; }) => {
  //       console.log('Google sign-in successful!');
  //       console.log('User profile information:');
  //       console.log('Name: ' + user.getName());
  //       console.log('Email: ' + user.getEmail());
  //       console.log('Photo URL: ' + user.getPhotoUrl());
  //       console.log('ID token: ' + user.getIdToken());
  //       console.log('Auth response: ' + user.getAuthResponse());
  //     },
  //     (      error: string) => {
  //       console.log('Google sign-in failed: ' + error);
  //     }
  //   );
  // }

  // async signInWithGoogle() {
  //   try {
  //     this.googleApi.signIn().then((user: User) => {
  //       this.handleSignedInUser(user);
  //     }).catch((error: any) => {
  //       console.error('Failed to sign in:', error);
  //     });
  //     // handle signed-in user here
  //   } catch (error) {
  //     // handle error here
  //   }
  // }

  // handleSignedInUser(user: User |any): void {
  //   console.log('Signed-in user data:');
  //   console.log(`ID: ${user.id}`);
  //   console.log(`Name: ${user.name}`);
  //   console.log(`Email: ${user.email}`);
  //   console.log(`Photo URL: ${user.photoUrl}`);
  // }

  // onSignIn(): void {
  //   const user: any = this.googleApi.signIn();
  //   if (user) {
  //     console.log('Google sign-in successful!');
  //     console.log('User profile information:');
  //     console.log('Name: ' + user.getName());
  //     console.log('Email: ' + user.getEmail());
  //     console.log('Photo URL: ' + user.getPhotoUrl());
  //     console.log('ID token: ' + user.getIdToken());
  //     console.log('Auth response: ' + user.getAuthResponse());
  //   } else {
  //     console.log('Google sign-in failed.');
  //   }
  // }

  // handleCredentialResponse(response: any): void {
  //   console.log('Signed in as:', response);
  // }

  //   handleCredentialResponse(response:any) {
  //     // decodeJwtResponse() is a custom function defined by you
  //     // to decode the credential response.

  //     console.log('hyy');

  //     const responsePayload = this.decodeJwtResponse(response.credential);

  //     console.log("ID: " + responsePayload.sub);
  //     console.log('Full Name: ' + responsePayload.name);
  //     console.log('Given Name: ' + responsePayload.given_name);
  //     console.log('Family Name: ' + responsePayload.family_name);
  //     console.log("Image URL: " + responsePayload.picture);
  //     console.log("Email: " + responsePayload.email);
  //  }

  //  decodeJwtResponse(response: string): any {
  //   const parts = response.split('.');
  //   const decoded = window.atob(parts[1]);
  //   return JSON.parse(decoded);
  // }

  // ngAfterViewInit(): void {
  // gapi.load('auth2', () => {
  //   gapi.auth2.init({
  //     client_id: 'YOUR_CLIENT_ID'
  //   });
  // });
  // gapi.load('client', () => {
  //   gapi.client.init({
  //     apiKey: '<your_api_key>',
  //     clientId: '<your_client_id>',
  //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //     scope: 'https://www.googleapis.com/auth/calendar.events'
  //   })
  //   .then(() => {
  //     // You can now call the Google API methods using gapi.client.<api_name>.<method_name>()
  //   })
  //   .catch((error) => {
  //     console.error('Error loading GAPI client:', error);
  //   });
  // });
  // }

  // public onSignIn(googleUser: any) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
}

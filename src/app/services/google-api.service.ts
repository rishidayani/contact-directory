// // import { Injectable } from '@angular/core';
// // import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
// // import { Subject } from 'rxjs';

// // const oAuthConfig: AuthConfig = {
// //   issuer: 'https://accounts.google.com',
// //   strictDiscoveryDocumentValidation: false,
// //   redirectUri: window.location.origin + '/contact/admin',
// //   clientId: '877272810140-p9m45jqdf7d1lnc2rd5tr9ovtq3ti2j3.apps.googleusercontent.com',
// //   scope: 'openid profile email',
// // };

// // export interface UserInfo {
// //   info: {
// //     sub: string,
// //     email: string,
// //     name: string,
// //     picture: string
// //   }
// // }

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class GoogleApiService {

// //   userProfileSubject = new Subject<UserInfo>()

// //   constructor(private readonly oAuthService: OAuthService) {
// //     oAuthService.configure(oAuthConfig)
// //     oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
// //     oAuthService.loadDiscoveryDocument().then(() => {
// //       oAuthService.tryLoginImplicitFlow().then(() => {
// //         if(!oAuthService.hasValidAccessToken()) {
// //           oAuthService.initLoginFlow()
// //         } else {
// //           oAuthService.loadUserProfile().then((userProfile) => {
// //             console.log(JSON.stringify(userProfile as UserInfo));
            
// //           })
// //         }
// //       })
// //     })
// //   }

// //   isLoggedIn() {
// //     return this.oAuthService.hasValidAccessToken()
// //   }

// //   signOut() {
// //     this.oAuthService.logOut()
// //   }
// // }
// import { Injectable } from '@angular/core';
// import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleApiService {
//   constructor(private socialAuthService: SocialAuthService) { }

//   signIn(): void {
//     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
//       .then(user => console.log(user))
//       .catch(error => console.error(error));
//   }

//   // public signIn(): Promise<User> {
//   //   return new Promise((resolve, reject) => {
//   //     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
//   //     .then(user => console.log(user))
//   //     .catch(error => console.error(error));
//   //     resolve(userData);
//   //     // If there is an error, reject the promise with the error
//   //     // reject(error);
//   //   });
//   // }
  

//   signOut(): void {
//     this.socialAuthService.signOut()
//       .then(() => console.log('User signed out.'))
//       .catch(error => console.error(error));
//   }
// }

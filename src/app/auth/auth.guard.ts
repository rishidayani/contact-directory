import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      var token: any = jwt_decode(jwtToken);
      if (token.exp >= Date.now() / 1000) {
        return true;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('gToken');
        this.router.navigate(['contacts/auth']);
        return false;
      }
    }
    this.router.navigate(['contacts/auth'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

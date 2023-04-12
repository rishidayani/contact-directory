import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  userName?: string;
  email: string;
  _id: string
  token:string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new Subject<User>()

  constructor(private http: HttpClient) {}
  private serverUrl: string = `http://localhost:3000`; //server url


  signup(userName: string, email: string, password: string,image : string, age: number, gender: string) {
    return this.http.post<AuthResponseData>(`${this.serverUrl}/users`, {
      userName: userName,
      email: email,
      password: password,
      image: image,
      age: age,
      gender: gender
    }).pipe(catchError(errorRes=> {
        let error = 'Email exist already'
        return throwError(error)
    }), tap( resData => {
        this.handleAuthentication(resData.email, resData._id, resData.token, 3600)
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
        `${this.serverUrl}/users/login`,
        {
            email: email,
            password: password
        })
        .pipe(catchError ((res) => {
            let error = 'Invalid Credentials'
            return throwError(error)
        }), tap( resData => {
            this.handleAuthentication(resData.email, resData._id, resData.token, 3600)
        }))
  }

  logout() {
    const options: any = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
    return this.http.post(
        `${this.serverUrl}/users/logout`,
        {
            
        },
        options
    )
  }

  userProfile() {
    const options: any = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }

      return this.http.get(
        `${this.serverUrl}/users/me`,
        options
      )
  }

  public editProfile(user: any) {
    const options: any = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const dataUrl:string = `${this.serverUrl}/users/me`
      return this.http.patch(dataUrl,user, options)
  }

  public deleteProfile () {
    const options: any = {
      headers : {
        "Authorization": localStorage.getItem('token')
      }
    }
    const dataURL: string = `${this.serverUrl}/users/me`
    return this.http.delete(dataURL,options)
  }

  private handleAuthentication(email:string,_id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn*1000
    )
    const user = new User(
        email,
        _id,
        token,
        expirationDate
    )
    this.user.next(user)
  }
}
